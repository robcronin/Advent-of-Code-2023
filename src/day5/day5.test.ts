import { logAnswer } from '../utils/logging';
import {
  convertFromMapping,
  convertFromXToY,
  day5,
  day5part2,
  parseAlmanac,
} from './day5';
import { data, testData } from './day5.data';

describe('day 5', () => {
  it('test cases', () => {
    expect(day5(testData)).toBe(35);
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(answer).toBe(175622908);
  });
});

describe('day 5 part 2', () => {
  it('test cases', () => {
    expect(day5part2(testData)).toBe(46);
  });

  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(answer).toBe(5200543);
  });
});

describe('convertFromMapping', () => {
  it('should convert seeds to soil', () => {
    const almanac = parseAlmanac(testData);
    const seedToSoil = almanac.mappings[0];
    expect(convertFromMapping(79, seedToSoil)).toBe(81);
    expect(convertFromMapping(14, seedToSoil)).toBe(14);
    expect(convertFromMapping(55, seedToSoil)).toBe(57);
  });
});

describe('convertFromXToY', () => {
  it('should convert seeds to location', () => {
    const almanac = parseAlmanac(testData);
    expect(convertFromXToY('seed', 'location', 79, almanac.mappings)).toBe(82);
    expect(convertFromXToY('seed', 'location', 14, almanac.mappings)).toBe(43);
    expect(convertFromXToY('seed', 'location', 55, almanac.mappings)).toBe(86);
    expect(convertFromXToY('seed', 'location', 13, almanac.mappings)).toBe(35);
  });
});
describe('convertFromXToYBack', () => {
  it('should convert location to seeds', () => {
    const almanac = parseAlmanac(testData);
    expect(
      convertFromXToY('location', 'seed', 82, almanac.mappings, true),
    ).toBe(79);
    expect(
      convertFromXToY('location', 'seed', 43, almanac.mappings, true),
    ).toBe(14);
    expect(
      convertFromXToY('location', 'seed', 86, almanac.mappings, true),
    ).toBe(55);
    expect(
      convertFromXToY('location', 'seed', 35, almanac.mappings, true),
    ).toBe(13);
  });
});
