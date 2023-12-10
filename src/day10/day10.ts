import { Coords, Grid, createGridFromInput } from '../utils/grid';

type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F';
type GridValue = Pipe | '.' | 'S';
type Map = Grid<GridValue>;
enum Color {
  RED = 'R',
  BLUE = 'B',
  LOOP = 'x',
  NONE = '.',
}
type Colors = Grid<Color>;

const directions = [
  [-1, 0], //up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
const movementOptions: Record<Pipe, [number, number]> = {
  '|': [0, 2],
  '-': [1, 3],
  L: [0, 1],
  J: [0, 3],
  '7': [2, 3],
  F: [1, 2],
};

const getStart = (grid: Map) => {
  const start = grid.findValueInGrid('S')[0];
  const upConnect = grid.get({ x: start.x - 1, y: start.y });
  const downConnect = grid.get({ x: start.x + 1, y: start.y });
  const leftConnect = grid.get({ x: start.x, y: start.y - 1 });
  const rightConnect = grid.get({ x: start.x, y: start.y + 1 });

  const isUp = upConnect && ['|', '7', 'F'].includes(upConnect);
  const isDown = downConnect && ['|', 'L', 'J'].includes(downConnect);
  const isLeft = leftConnect && ['-', 'L', 'F'].includes(leftConnect);
  const isRight = rightConnect && ['-', 'J', '7'].includes(rightConnect);

  let startValue: GridValue = '.';

  if (isUp && isDown) startValue = '|';
  else if (isLeft && isRight) startValue = '-';
  else if (isUp && isRight) startValue = 'L';
  else if (isUp && isLeft) startValue = 'J';
  else if (isDown && isLeft) startValue = '7';
  else if (isDown && isRight) startValue = 'F';

  grid.set(start, startValue);

  return start;
};

const getNextDirection = (curDir: number, pipe: Pipe) => {
  const options = movementOptions[pipe];
  const reverseDir = (curDir + 2) % 4;
  const next = options.find((opt) => opt !== reverseDir) as number;
  return next;
};

const setColor = (
  lastDirectionIndex: number,
  nextDirectionIndex: number,
  pos: Coords,
  colors: Colors,
) => {
  const dirs = [lastDirectionIndex, nextDirectionIndex];
  const { x, y } = pos;

  // Logic of clockwise: right = set below, down = set left, left = set above, up = set right
  directions.forEach((direction, index) => {
    colors.set(
      { x: x + 1 * direction[1], y: y + -1 * direction[0] },
      dirs.includes(index) ? Color.RED : Color.BLUE,
    );
  });
};

const getLoop = (grid: Map, start: Coords, colors?: Colors) => {
  const startValue = grid.get(start) as Pipe;
  let directionIndex = movementOptions[startValue][0];
  let position = start;
  let steps = 0;
  const loopCoords = [start];
  while (!(position.x === start.x && position.y === start.y && steps !== 0)) {
    const direction = directions[directionIndex];
    position = { x: position.x + direction[0], y: position.y + direction[1] };
    steps++;
    loopCoords.push(position);

    const nextValue = grid.get(position) as Pipe;
    const nextDirectionIndex = getNextDirection(directionIndex, nextValue);
    if (colors) {
      setColor(directionIndex, nextDirectionIndex, position, colors);
    }
    directionIndex = nextDirectionIndex;
  }
  loopCoords.forEach((loopCoord) => colors?.set(loopCoord, Color.LOOP));
  return { steps, loopCoords };
};

const getIsInLoop = (coord: Coords, loopCoords: Coords[]) =>
  !!loopCoords.find((loopCoord) => loopCoord.x === coord.x && loopCoord.y === coord.y);

const getIsWall = (coord: Coords, grid: Map) =>
  coord.x === 0 || coord.x === grid.numRows - 1 || coord.y === 0 || coord.y === grid.numCols - 1;

const bfs = (
  grid: Map,
  options: Set<string>,
  visited: Set<string>,
  loopCoords: Coords[],
  inners: Set<string>,
  outers: Set<string>,
  colors: Colors,
  insideColor: Color,
): boolean => {
  if (options.size === 0) return true;
  const newOptions = new Set<string>();
  let hitWall = false;
  let foundInner = false;
  let foundOuter = false;
  [...options].forEach((optString) => {
    visited.add(optString);
    const [x, y] = optString.split(',');
    const pos = { x: +x, y: +y };

    if (getIsWall(pos, grid)) hitWall = true;
    if (colors.get(pos) === insideColor) foundInner = true;

    const neighbours = grid.getNeighbours(pos);
    neighbours.forEach((neighbour) => {
      const neighbourString = `${neighbour.x},${neighbour.y}`;
      if (inners.has(neighbourString)) foundInner = true;
      if (outers.has(neighbourString)) foundOuter = true;

      if (!visited.has(neighbourString)) {
        if (!getIsInLoop(neighbour, loopCoords)) {
          newOptions.add(neighbourString);
        }
      }
    });
  });

  if (hitWall || foundOuter) return true;
  if (foundInner) return false;

  return bfs(grid, newOptions, visited, loopCoords, inners, outers, colors, insideColor);
};

const getCanGetOut = (
  grid: Map,
  coord: Coords,
  loopCoords: Coords[],
  inners: Set<string>,
  outers: Set<string>,
  colors: Colors,
  insideColor: Color,
) => {
  const options = new Set<string>();
  options.add(`${coord.x},${coord.y}`);
  return bfs(grid, options, new Set<string>(), loopCoords, inners, outers, colors, insideColor);
};

const getIsAnInner = (
  grid: Map,
  coord: Coords,
  loopCoords: Coords[],
  inners: Set<string>,
  outers: Set<string>,
  colors: Colors,
  insideColor: Color,
) => {
  if (getIsInLoop(coord, loopCoords)) return false;
  const isOuter = getCanGetOut(grid, coord, loopCoords, inners, outers, colors, insideColor);
  const coordString = `${coord.x},${coord.y}`;

  if (isOuter) outers.add(coordString);
  else inners.add(coordString);

  return !isOuter;
};

const getInsideColor = (colors: Colors) => {
  for (let x = 0; x < colors.numRows; x++) {
    for (let y = 0; y < colors.numCols; y++) {
      if (colors.get({ x, y }) !== Color.NONE) {
        return colors.get({ x, y }) === Color.RED ? Color.BLUE : Color.RED;
      }
    }
  }
  throw new Error('No Color found in grid');
};

export const day10 = (input: string[]) => {
  const grid = createGridFromInput(input) as Map;
  const start = getStart(grid);
  const loopLength = getLoop(grid, start).steps;

  return loopLength / 2;
};

export const day10part2 = (input: string[]) => {
  const grid = createGridFromInput(input) as Map;
  const start = getStart(grid);
  const colors = new Grid(grid.numRows, grid.numCols, Color.NONE);
  const loopCoords = getLoop(grid, start, colors).loopCoords;

  const insideColor = getInsideColor(colors);

  const inners = new Set<string>();
  const outers = new Set<string>();
  for (let x = 0; x < grid.numRows; x++) {
    for (let y = 0; y < grid.numCols; y++) {
      getIsAnInner(grid, { x, y }, loopCoords, inners, outers, colors, insideColor);
    }
  }

  return inners.size;
};
