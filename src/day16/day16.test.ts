import { logAnswer } from '../utils/logging';
import { day16, day16part2 } from './day16';
import { data, testData } from './day16.data';

describe('day 16', () => {
  it('test cases', () => {
    expect(day16(testData)).toBe(46);
  });

  it('answer', () => {
    const answer = day16(data);
    logAnswer(answer, 16, 1);
    expect(answer).toBe(7236);
  });
});

describe('day 16 part 2', () => {
  it('test cases', () => {
    expect(day16part2(testData)).toBe(51);
  });

  it('answer', () => {
    const answer = day16part2(data);
    logAnswer(answer, 16, 2);
    expect(answer).toBe(7521);
  });
});
