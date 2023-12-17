import { logAnswer } from '../utils/logging';
import { day12, day12part2, extendRecords, getRecNumPerms, parseRecords } from './day12';
import { data, testData } from './day12.data';

describe('day 12', () => {
  it('test cases', () => {
    expect(day12(testData)).toBe(21);
  });

  it('answer', () => {
    const answer = day12(data);
    logAnswer(answer, 12, 1);
    expect(answer).toBe(7379);
  });
});

describe('day 12 part 2', () => {
  it('test cases', () => {
    expect(day12part2(testData)).toBe(525152);
  });

  it.skip('answer', () => {
    const answer = day12part2(data);
    logAnswer(answer, 12, 2);
    expect(answer).toBe(7732028747925);
  });
});

describe('getRecNumPerms', () => {
  it('should return the valid perms for a record', () => {
    expect(getRecNumPerms({ springs: '???.###'.split(''), groups: [1, 1, 3] })).toBe(1);
    expect(getRecNumPerms({ springs: '????????'.split(''), groups: [2, 1] })).toBe(15);
    expect(getRecNumPerms({ springs: '.??..??...?##.'.split(''), groups: [1, 1, 3] })).toBe(4);
    expect(getRecNumPerms({ springs: '?#?#?#?#?#?#?#?'.split(''), groups: [1, 3, 1, 6] })).toBe(1);
    expect(getRecNumPerms({ springs: '????.#...#...'.split(''), groups: [4, 1, 1] })).toBe(1);
    expect(getRecNumPerms({ springs: '????.######..#####.'.split(''), groups: [1, 6, 5] })).toBe(4);
    expect(getRecNumPerms({ springs: '?###????????'.split(''), groups: [3, 2, 1] })).toBe(10);
    expect(
      getRecNumPerms({
        springs: '.??..??...?##.?.??..??...?##'.split(''),
        groups: [1, 1, 3, 1, 1, 3],
      }),
    ).toBe(32);
  });

  const records = parseRecords(testData);
  const extendedRecords = extendRecords(records);

  it.each([
    [0, 1],
    [1, 16384],
    [2, 1],
    [3, 16],
    [4, 2500],
    [5, 506250], // 15^4 * 10
  ])('for example %p should return %p valid perms', (index, perms) => {
    expect(getRecNumPerms(extendedRecords[index])).toBe(perms);
  });
});
