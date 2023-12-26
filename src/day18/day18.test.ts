import { logAnswer } from '../utils/logging';
import { day18, day18part2 } from './day18';
import { data, testData } from './day18.data';

describe('day 18', () => {
  it('test cases', () => {
    expect(day18(testData)).toBe(62);
  });

  it('answer', () => {
    const answer = day18(data);
    logAnswer(answer, 18, 1);
    expect(answer).toBe(50603);
  });
});

describe('day 18 part 2', () => {
  it('test cases', () => {
    expect(day18part2(testData)).toBe(952408144115);
  });

  it('answer', () => {
    const answer = day18part2(data);
    logAnswer(answer, 18, 2);
    expect(answer).toBe(96556251590677);
  });
});
