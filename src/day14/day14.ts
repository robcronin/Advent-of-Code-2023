import { Grid, createGridFromInput } from '../utils/grid';
import { range } from '../utils/looping';

enum Value {
  ROUND = 'O',
  CUBE = '#',
  EMPTY = '.',
}
type Platform = Grid<Value>;

enum Direction {
  NORTH = 0,
  EAST = 1,
  SOUTH = 2,
  WEST = 3,
}

const directions = [
  [1, 0], // n
  [0, -1], // e
  [-1, 0], // s
  [0, 1], // w
];

const tiltPlatform = (platform: Platform, direction: Direction) => {
  const [dx, dy] = directions[direction];
  range(platform.numCols).forEach((c) => {
    range(platform.numRows).forEach((r) => {
      const x = dx < 0 ? platform.numRows - r - 1 : r;
      const y = dy < 0 ? platform.numCols - c - 1 : c;
      if (platform.get({ x, y }) === Value.ROUND) {
        let offset = [dx, dy];
        while (platform.get({ x: x - offset[0], y: y - offset[1] }) === Value.EMPTY) {
          platform.set({ x: x - offset[0], y: y - offset[1] }, Value.ROUND);
          platform.set({ x: x - offset[0] + dx, y: y - offset[1] + dy }, Value.EMPTY);
          offset = [offset[0] + dx, offset[1] + dy];
        }
      }
    });
  });
};

const getLoad = (platform: Platform): number => {
  let load = 0;
  range(platform.numCols).forEach((y) => {
    range(platform.numRows).forEach((x) => {
      if (platform.get({ x, y }) === Value.ROUND) {
        load += platform.numRows - x;
      }
    });
  });
  return load;
};

export const day14 = (input: string[]) => {
  const platform = createGridFromInput(input) as Platform;
  platform.print();
  tiltPlatform(platform, Direction.EAST);
  platform.print();

  return getLoad(platform);
};

export const day14part2 = (input: string[]) => {
  return 14;
};
