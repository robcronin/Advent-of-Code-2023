import { Grid, createGridFromInput } from '../utils/grid';
import { range } from '../utils/looping';

enum Value {
  ROUND = 'O',
  CUBE = '#',
  EMPTY = '.',
}
type Platform = Grid<Value>;

const directions = [[1, 0]];

const tiltPlatform = (platform: Platform, isSouth?: boolean) => {
  const direction = directions[0];
  range(platform.numRows).forEach((r) => {
    range(platform.numCols).forEach((c) => {
      const x = isSouth ? platform.numRows - r - 1 : r;
      if (platform.get({ x, y: c }) === Value.ROUND) {
        const mult = isSouth ? -1 : 1;
        let offset = mult * 1;
        while (platform.get({ x: x - offset, y: c }) === Value.EMPTY) {
          platform.set({ x: x - offset, y: c }, Value.ROUND);
          platform.set({ x: x - offset + mult * 1, y: c }, Value.EMPTY);
          offset += mult * 1;
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
  tiltPlatform(platform);
  platform.print();
  tiltPlatform(platform, true);
  platform.print();
  tiltPlatform(platform, true);
  platform.print();
  tiltPlatform(platform);
  platform.print();

  return getLoad(platform);
};

export const day14part2 = (input: string[]) => {
  return 14;
};
