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

const tiltCycle = (platform: Platform, numCycles: number, getCycles?: boolean) => {
  const cycles = [];
  for (let i = 0; i < numCycles; i++) {
    tiltPlatform(platform, Direction.NORTH);
    tiltPlatform(platform, Direction.WEST);
    tiltPlatform(platform, Direction.SOUTH);
    tiltPlatform(platform, Direction.EAST);
    if (getCycles) cycles.push(getLoad(platform));
  }
  return cycles;
};

const getLoopSize = (cycles: number[]): number | undefined =>
  range(2, cycles.length / 2).find((loopSize) =>
    range(loopSize).every((i) => cycles[i] === cycles[i + loopSize]),
  );

export const day14 = (input: string[]) => {
  const platform = createGridFromInput(input) as Platform;
  tiltPlatform(platform, Direction.NORTH);
  return getLoad(platform);
};

export const day14part2 = (input: string[]) => {
  const platform = createGridFromInput(input) as Platform;
  tiltCycle(platform, 100);
  const cycles = tiltCycle(platform, 200, true);
  const loopSize = getLoopSize(cycles);
  if (!loopSize) throw new Error('No loop size found');
  return cycles[(1000000000 - 101) % loopSize];
};
