import { logAnswer } from '../utils/logging';
import { day11, day11part2 } from './day11';
import { data, testData } from './day11.data';

describe('day 11', () => {
  it('test cases', () => {
    expect(day11(testData)).toBe(374);
  });

  it('answer', () => {
    const answer = day11(data);
    logAnswer(answer, 11, 1);
    expect(answer).toBe(9734203);
  });
});

describe('day 11 part 2', () => {
  it('test cases 2x', () => {
    expect(day11part2(testData, 2)).toBe(374);
  });
  it('test cases 10x', () => {
    expect(day11part2(testData, 10)).toBe(1030);
  });

  it('test cases 1Mx', () => {
    expect(day11part2(testData, 100)).toBe(8410);
  });

  it('answer', () => {
    const answer = day11part2(data, 1000000);
    logAnswer(answer, 11, 2);
    expect(answer).toBe(568914596391);
  });
});
