import { logAnswer } from '../utils/logging';
import { day1, day1part2 } from './day1';
import { data, testData, testData2 } from './day1.data';

describe('day 1', () => {
  it('test cases', () => {
    expect(day1(testData)).toBe(142);
  });

  it('answer', () => {
    const answer = day1(data);
    logAnswer(answer, 1, 1);
    expect(answer).toBe(55029);
  });
});

describe('day 1 part 2', () => {
  it('test cases', () => {
    expect(day1part2(testData)).toBe(142);
  });
  it('test cases 2', () => {
    expect(day1part2(testData2)).toBe(83);
  });

  it('answer', () => {
    const answer = day1part2(data);
    logAnswer(answer, 1, 2);
    expect(answer).toBe(55686);
  });
});
