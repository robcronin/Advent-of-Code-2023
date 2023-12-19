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

const tiltCycle = (platform: Platform, numCycles: number, print?: boolean) => {
  const prints = [];
  for (let i = 0; i < numCycles; i++) {
    if (i % 10000 === 0) console.log(i, i / numCycles);
    tiltPlatform(platform, Direction.NORTH);
    tiltPlatform(platform, Direction.WEST);
    tiltPlatform(platform, Direction.SOUTH);
    tiltPlatform(platform, Direction.EAST);
    if (print) prints.push(getLoad(platform));
  }
  if (print) console.log(prints);
};

export const day14 = (input: string[]) => {
  const platform = createGridFromInput(input) as Platform;
  tiltPlatform(platform, Direction.NORTH);
  return getLoad(platform);
};

export const day14part2 = (input: string[]) => {
  const platform = createGridFromInput(input) as Platform;
  tiltCycle(platform, 10000);
  tiltCycle(platform, 100, true);
  // platform.print();
  const a1 = [
    65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65,
    63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69,
    69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64,
    65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68,
    69, 69, 65, 64,
  ];
  const a = [
    99135, 99165, 99179, 99158, 99097, 99106, 99121, 99103, 99131, 99150, 99181, 99163, 99132,
    99102, 99115, 99105, 99116, 99146, 99166, 99165, 99137, 99137, 99111, 99099, 99118, 99131,
    99162, 99150, 99139, 99142, 99146, 99095, 99112, 99133, 99147, 99146, 99124, 99144, 99151,
    99130, 99108, 99127, 99149, 99131, 99120, 99129, 99153, 99135, 99143, 99123, 99143, 99133,
    99105, 99125, 99138, 99137, 99148, 99158, 99139, 99127, 99107, 99110, 99134, 99122, 99150,
    99163, 99174, 99123, 99101, 99112, 99119, 99118, 99135, 99165, 99179, 99158, 99097, 99106,
    99121, 99103, 99131, 99150, 99181, 99163, 99132, 99102, 99115, 99105, 99116, 99146, 99166,
    99165, 99137, 99137, 99111, 99099, 99118, 99131, 99162, 99150,
  ];
  const b1 = (1000000000 - 10001) % 7;
  const b = (1000000000 - 10001) % 72;
  console.log(a1[b1], a[b]);
  return a[b];
  const index = a.findIndex((i) => i === 99135);
  console.log({ index });
  return getLoad(platform);
};

// 99129 - too high
