import { Grid, createGridFromInput } from '../utils/grid';
import { range } from '../utils/looping';

enum Value {
  ROUND = 'O',
  CUBE = '#',
  EMPTY = '.',
}
type Platform = Grid<Value>;

const tiltPlatform = (platform: Platform) => {
  range(platform.numRows).forEach((x) => {
    range(platform.numCols).forEach((y) => {
      if (platform.get({ x, y }) === Value.ROUND) {
        let offset = 1;
        while (platform.get({ x: x - offset, y }) === Value.EMPTY) {
          platform.set({ x: x - offset, y }, Value.ROUND);
          platform.set({ x: x - offset + 1, y }, Value.EMPTY);
          offset++;
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

  return getLoad(platform);
};

export const day14part2 = (input: string[]) => {
  return 14;
};
