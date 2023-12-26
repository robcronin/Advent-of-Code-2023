import { Coords } from '../utils/grid';

type DigPlan = {
  directionIndex: number;
  length: number;
};

enum Value {
  TRENCH = '#',
  EMPTY = '.',
  VOID = '?',
}

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];
const getDirectionIndex = (direction: string): number => {
  if (direction === 'R') return 0;
  if (direction === 'D') return 1;
  if (direction === 'L') return 2;
  if (direction === 'U') return 3;
  throw new Error(`${direction} incorrect`);
};

const parseDigPlan = (input: string[], convert?: boolean): DigPlan[] =>
  input.map((line) => {
    const groups = line.match(/(D|L|R|U) ([0-9]+) \(#([0-9a-f]+)\)/);
    if (!groups) throw new Error(`${line} does not match`);
    const [_, direction, length, hex] = groups;
    const directionIndex = getDirectionIndex(direction);

    const length2 = parseInt(hex.slice(0, 5), 16);
    const directionIndex2 = +hex.slice(5, 6);

    return { directionIndex: convert ? directionIndex2 : directionIndex, length: convert ? length2 : +length };
  });

const getCoords = (digPlan: DigPlan[]) => {
  let location = { x: 0, y: 0 };
  let totalLength = 0;
  const coords: Coords[] = [location];
  digPlan.forEach((plan) => {
    const { directionIndex, length } = plan;
    const [dx, dy] = directions[directionIndex];
    location = { x: location.x + length * dx, y: location.y + length * dy };
    coords.push(location);
    totalLength += length;
  });
  return { coords, totalLength };
};

const getArea = (digPlan: DigPlan[]) => {
  const { coords, totalLength } = getCoords(digPlan);

  const area = coords.reverse().reduce((sum, _coord, i) => {
    if (i === coords.length - 1) return sum;
    const one = coords[i];
    const two = coords[i + 1];
    return sum + one.x * two.y - two.x * one.y;
  }, 0);

  return area / 2 + totalLength / 2 + 1;
};

export const day18 = (input: string[]) => {
  const digPlan = parseDigPlan(input);
  return getArea(digPlan);
};

export const day18part2 = (input: string[]) => {
  const digPlan = parseDigPlan(input, true);
  return getArea(digPlan);
};
