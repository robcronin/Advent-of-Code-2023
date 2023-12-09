import { logAnswer } from '../utils/logging';
import { binSearchStart, day6, day6part2 } from './day6';
import { data, testData } from './day6.data';

describe('day 6', () => {
  it('test cases', () => {
    expect(day6(testData)).toBe(288);
  });

  it('answer', () => {
    const answer = day6(data);
    logAnswer(answer, 6, 1);
    expect(answer).toBe(4568778);
  });
});

describe('day 6 part 2', () => {
  it('test cases', () => {
    expect(day6part2(testData)).toBe(71503);
  });

  it('answer', () => {
    const answer = day6part2(data);
    logAnswer(answer, 6, 2);
    expect(answer).toBe(28973936);
  });
});

describe('binSearchStart', () => {
  it('should find the first winning time', () => {
    expect(binSearchStart(0, 7, { time: 7, distanceRecord: 9 })).toBe(2);
  });
});
