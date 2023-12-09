import { minArr } from '../utils/array';
import { parseInput } from '../utils/input';

type Range = { sourceStart: number; destStart: number; length: number };
type Mapping = {
  source: string;
  destination: string;
  ranges: Range[];
};
type Almanac = {
  seedNums: number[];
  mappings: Mapping[];
};

export const parseAlmanac = (input: string[]): Almanac => {
  const [seeds, ...maps] = input;
  const seedNums = parseInput(seeds.split(': ')[1]) as number[];
  const mappings = maps.map((map) => {
    const [translation, rangeString] = map.split(' map:\n');
    const [source, destination] = translation.split('-to-');
    const ranges = parseInput(rangeString).map((r) => {
      const [destStart, sourceStart, length] = parseInput(
        r as string,
      ) as number[];
      return { destStart, sourceStart, length };
    });
    return { source, destination, ranges };
  });
  return { seedNums, mappings };
};

export const convertFromMapping = (
  itemNumber: number,
  mapping: Mapping,
  isBackwards?: boolean,
): number => {
  const range = mapping.ranges.find((range) => {
    const { destStart, sourceStart, length } = range;
    const start = isBackwards ? destStart : sourceStart;
    return itemNumber >= start && itemNumber < start + length;
  });

  if (range) {
    const { destStart, sourceStart } = range;
    const start = isBackwards ? destStart : sourceStart;
    const convertStart = isBackwards ? sourceStart : destStart;

    const diff = itemNumber - start;
    return diff + convertStart;
  }
  return itemNumber;
};

export const convertFromXToY = (
  source: string,
  dest: string,
  itemNumber: number,
  mappings: Mapping[],
  isBackwards?: boolean,
): number => {
  let curType = source;
  let curNum = itemNumber;
  while (curType !== dest) {
    const mapping = mappings.find((mapping) => {
      const typeToFind = isBackwards ? mapping.destination : mapping.source;
      return typeToFind === curType;
    });
    if (!mapping) throw new Error(`No mapping for ${curType}`);
    curType = isBackwards ? mapping.source : mapping.destination;
    curNum = convertFromMapping(curNum, mapping, isBackwards);
  }
  return curNum;
};

const getLowestLocation = (almanac: Almanac): number => {
  const locations = almanac.seedNums.map((seed) =>
    convertFromXToY('seed', 'location', seed, almanac.mappings),
  );
  return minArr(locations, (i) => i);
};

const isSeedInRange = (seed: number, almanac: Almanac) => {
  const seedNums = almanac.seedNums;
  for (let i = 0; i < seedNums.length; i++) {
    const start = seedNums[i];
    const length = seedNums[i + 1];
    if (seed >= start && seed < start + length) return true;
    i++;
  }
  return false;
};

const getLowestLocationWithRange = (almanac: Almanac): number => {
  let location = 0;
  while (true) {
    const seed = convertFromXToY(
      'location',
      'seed',
      location,
      almanac.mappings,
      true,
    );
    if (isSeedInRange(seed, almanac)) break;
    location++;
  }
  return location;
};

export const day5 = (input: string[]) => {
  const almanac = parseAlmanac(input);
  return getLowestLocation(almanac);
};

export const day5part2 = (input: string[]) => {
  const almanac = parseAlmanac(input);
  return getLowestLocationWithRange(almanac);
};
