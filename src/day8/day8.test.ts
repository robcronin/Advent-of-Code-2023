import { logAnswer } from '../utils/logging';
import { day8, day8part2 } from './day8';
import { data, testData, testData2 } from './day8.data';

describe('day 8', () => {
  it('test cases', () => {
    expect(day8(testData)).toBe(6);
  });

  it('answer', () => {
    const answer = day8(data);
    logAnswer(answer, 8, 1);
    expect(answer).toBe(20777);
  });
});

describe('day 8 part 2', () => {
  it('test cases', () => {
    expect(day8part2(testData2)).toBe(6);
  });

  it('answer', () => {
    const answer = day8part2(data);
    logAnswer(answer, 8, 2);
    expect(answer).toBe(13289612809129);
  });
});
