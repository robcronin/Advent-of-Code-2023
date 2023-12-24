import { Coords, Grid, createGridFromInput } from '../utils/grid';
import { range } from '../utils/looping';

type Map = Grid<string>;
type Neighbour = { coords: Coords; direction: number; length: number };
type Node = Neighbour & { cost: number };

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

const hasAllTargetVisits = (visitedSet: Set<string>, target: Coords, maxSteps: number) =>
  range(maxSteps * 2).every((i) => {
    const check = { x: target.x * (i + 1), y: target.y };
    return visitedSet.has(`${check.x},${check.y}`);
  });

const getValidNeighbours = (map: Map, node: Node, maxSteps: number, minSteps: number): Neighbour[] => {
  const { direction, length, coords } = node;
  return directions
    .map(([dx, dy], index) => {
      return {
        direction: index,
        coords: { x: coords.x + dx, y: coords.y + dy },
        length: index === direction ? length + 1 : 1,
      };
    })
    .filter((neighbour) => neighbour.direction !== (direction + 2) % 4 && neighbour.length <= maxSteps)
    .filter((neighbour) => (length < minSteps ? neighbour.length > 1 : true))
    .filter((neighbour) => map.isCoordValid(neighbour.coords));
};

const getVisitedCoords = (neighbour: Neighbour, maxSteps: number, map: Map) => ({
  x: (neighbour.direction * maxSteps + neighbour.length) * map.numRows + neighbour.coords.x,
  y: neighbour.coords.y,
});

const getNodeKey = (neighbour: Neighbour, maxSteps: number, map: Map) => {
  const coords = getVisitedCoords(neighbour, maxSteps, map);
  return `${coords.x},${coords.y}`;
};

export const getMinHeatLoss = (map: Map, maxSteps: number, minSteps: number): number => {
  const { numRows, numCols } = map;
  const visitedSet = new Set<string>();
  const target = { x: numRows - 1, y: numCols - 1 };

  const queue: Node[] = [
    { coords: { x: 0, y: 0 }, cost: 0, direction: 0, length: 1 },
    { coords: { x: 0, y: 0 }, cost: 0, direction: 1, length: 1 },
  ];
  const maxCost = numRows * numCols * 9;
  let ans: number = maxCost;

  while (!hasAllTargetVisits(visitedSet, target, maxSteps)) {
    const nextNode = queue.shift();
    if (!nextNode) break;

    const { coords, cost: nodeCost } = nextNode;
    if (coords.x === target.x && coords.y === target.y && nextNode.length >= minSteps) {
      ans = Math.min(nodeCost, ans);
    }

    const validNeighbours = getValidNeighbours(map, nextNode, maxSteps, minSteps);

    validNeighbours.forEach((neighbour) => {
      const { x: neighX, y: neighY } = neighbour.coords;
      const nodeKey = getNodeKey(neighbour, maxSteps, map);
      if (!visitedSet.has(nodeKey)) {
        const currentNeighboutCost =
          queue.find(
            (a) =>
              a.coords.x === neighX &&
              a.coords.y === neighY &&
              a.direction === neighbour.direction &&
              a.length === neighbour.length,
          )?.cost || maxCost;
        const potentialMinCost = nodeCost + +map.get(neighbour.coords);
        if (potentialMinCost < currentNeighboutCost) {
          queue.push({
            ...neighbour,
            cost: potentialMinCost,
          });
        }
      }
      queue.sort((a, b) => a.cost - b.cost);
    });

    visitedSet.add(getNodeKey(nextNode, maxSteps, map));
  }
  return ans;
};

export const day17 = (input: string[]) => {
  const map = createGridFromInput(input) as Map;
  return getMinHeatLoss(map, 3, 1);
};

export const day17part2 = (input: string[]) => {
  const map = createGridFromInput(input) as Map;
  return getMinHeatLoss(map, 10, 4);
};
