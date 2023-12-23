import { Coords, Grid, createGridFromInput } from '../utils/grid';

enum Value {
  EMPTY = '.',
  HSPLIT = '-',
  VSPLIT = '|',
  CLOCK_MIRROR = 'l',
  COUNTER_MIRROR = '/',
}
type Contraption = Grid<Value>;
type Beam = {
  location: Coords;
  directionIndex: number;
};

const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

const getNextBeams = (beams: Beam[], contraption: Contraption): Beam[] =>
  beams.flatMap(({ location, directionIndex }) => {
    const direction = directions[directionIndex];
    const nextLocation = { x: location.x + direction[0], y: location.y + direction[1] };
    const nextValue = contraption.get(nextLocation);
    const nextBeam = { location: nextLocation, directionIndex };
    if (!nextValue) return [];
    if (nextValue === Value.EMPTY) return [nextBeam];
    if (nextValue === Value.HSPLIT) {
      if (directionIndex % 2 === 0) return [nextBeam];
      return [
        { location: nextLocation, directionIndex: (directionIndex + 1) % 4 },
        { location: nextLocation, directionIndex: (directionIndex + 3) % 4 },
      ];
    }
    if (nextValue === Value.VSPLIT) {
      if (directionIndex % 2 === 1) return [nextBeam];
      return [
        { location: nextLocation, directionIndex: (directionIndex + 1) % 4 },
        { location: nextLocation, directionIndex: (directionIndex + 3) % 4 },
      ];
    }
    if (nextValue === Value.CLOCK_MIRROR) {
      if (directionIndex % 2 === 0) return [{ location: nextLocation, directionIndex: (directionIndex + 1) % 4 }];
      return [{ location: nextLocation, directionIndex: (directionIndex + 3) % 4 }];
    }
    if (nextValue === Value.COUNTER_MIRROR) {
      if (directionIndex % 2 === 0) return [{ location: nextLocation, directionIndex: (directionIndex + 3) % 4 }];
      return [{ location: nextLocation, directionIndex: (directionIndex + 1) % 4 }];
    }
    throw new Error(`Incorrect Value: ${nextValue}`);
  });

const getBeamKey = (beam: Beam) => `${beam.location.x},${beam.location.y},${beam.directionIndex}`;

const getNumEnergised = (contraption: Contraption, location: Coords, directionIndex: number): number => {
  let beams: Beam[] = [{ location, directionIndex }];
  const energised = new Set<string>();
  const visited = new Set<string>();

  visited.add(getBeamKey(beams[0]));

  while (beams.length > 0) {
    beams = getNextBeams(beams, contraption);
    beams = beams.filter((beam) => !visited.has(getBeamKey(beam)));
    beams.forEach((beam) => {
      energised.add(`${beam.location.x},${beam.location.y}`);
      visited.add(getBeamKey(beam));
    });
  }
  return energised.size;
};

const getMaxEnergised = (contraption: Contraption) => {
  let max = 0;
  for (let x = 0; x < contraption.numRows; x++) {
    const energisedLeft = getNumEnergised(contraption, { x, y: -1 }, 0);
    const energisedRight = getNumEnergised(contraption, { x, y: contraption.numCols }, 2);
    max = Math.max(max, energisedLeft, energisedRight);
  }
  for (let y = 0; y < contraption.numCols; y++) {
    const energisedTop = getNumEnergised(contraption, { x: -1, y }, 1);
    const energisedBottom = getNumEnergised(contraption, { x: contraption.numRows, y }, 3);
    max = Math.max(max, energisedTop, energisedBottom);
  }
  return max;
};

export const day16 = (input: string[]) => {
  const contraption = createGridFromInput(input) as Contraption;
  return getNumEnergised(contraption, { x: 0, y: -1 }, 0);
};

export const day16part2 = (input: string[]) => {
  const contraption = createGridFromInput(input) as Contraption;
  return getMaxEnergised(contraption);
};
