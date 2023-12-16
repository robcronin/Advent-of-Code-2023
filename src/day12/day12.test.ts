import { logAnswer } from '../utils/logging';
import {
  day12,
  day12part2,
  extendRecords,
  getBigNumPerms,
  getIsValidRecord,
  getNumValidPerms,
  getPerms,
  parseRecords,
} from './day12';
import { data, testData } from './day12.data';

describe('day 12', () => {
  it('test cases', () => {
    expect(day12(testData)).toBe(21);
  });

  it.skip('answer', () => {
    const answer = day12(data);
    logAnswer(answer, 12, 1);
    expect(answer).toBe(7379);
  });
});

describe('day 12 part 2', () => {
  it.skip('test cases', () => {
    expect(day12part2(testData)).toBe(525152);
  });

  it.skip('answer', () => {
    const answer = day12part2(data);
    logAnswer(answer, 12, 2);
    expect(answer).toBe(12);
  });
});

describe('getIsValidRecord', () => {
  it('should return true for valid records', () => {
    expect(getIsValidRecord({ springs: '#.#.###'.split(''), groups: [1, 1, 3] })).toBe(true);
    expect(getIsValidRecord({ springs: '#.#.##'.split(''), groups: [1, 1, 2] })).toBe(true);
    expect(getIsValidRecord({ springs: '..#.#.##'.split(''), groups: [1, 1, 2] })).toBe(true);
    expect(getIsValidRecord({ springs: '..##.#.##.'.split(''), groups: [2, 1, 2] })).toBe(true);
  });
  it('should return false for invalid records', () => {
    expect(getIsValidRecord({ springs: '#.#.##'.split(''), groups: [1, 1, 3] })).toBe(false);
    expect(getIsValidRecord({ springs: '#.#.###'.split(''), groups: [1, 1, 2] })).toBe(false);
  });
});

describe('getPerms', () => {
  it('should get the perms of springs', () => {
    expect(getPerms(0, 0)).toEqual([]);
    expect(getPerms(1, 1)).toEqual([['#']]);
    expect(getPerms(2, 1)).toEqual([
      ['.', '#'],
      ['#', '.'],
    ]);
    expect(getPerms(3, 2)).toEqual([
      ['.', '#', '#'],
      ['#', '.', '#'],
      ['#', '#', '.'],
    ]);
  });
});

describe('getNumValidPerms', () => {
  it('should return the valid perms for a record', () => {
    expect(getNumValidPerms({ springs: '???.###'.split(''), groups: [1, 1, 3] })).toBe(1);
    expect(getNumValidPerms({ springs: '.??..??...?##.'.split(''), groups: [1, 1, 3] })).toBe(4);
    expect(getNumValidPerms({ springs: '?#?#?#?#?#?#?#?'.split(''), groups: [1, 3, 1, 6] })).toBe(
      1,
    );
    expect(getNumValidPerms({ springs: '????.#...#...'.split(''), groups: [4, 1, 1] })).toBe(1);
    expect(getNumValidPerms({ springs: '????.######..#####.'.split(''), groups: [1, 6, 5] })).toBe(
      4,
    );
    expect(getNumValidPerms({ springs: '?###????????'.split(''), groups: [3, 2, 1] })).toBe(10);
  });
});

describe.only('getBigNumPerms', () => {
  const records = parseRecords(testData);
  const extendedRecords = extendRecords(records);
  it.each([
    [0, 1],
    [1, 16384],
    [2, 1],
    [3, 16],
    [4, 2500],
    [5, 506250],
  ])('should return valid perms for %p', (index, perms) => {
    expect(getBigNumPerms(extendedRecords[index])).toBe(perms);
  });
});
