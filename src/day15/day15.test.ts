import { logAnswer } from '../utils/logging';
import { day15, day15part2 } from './day15';
import { data, testData } from './day15.data';

describe('day 15', () => {
  it('test cases', () => {
    expect(day15(testData)).toBe(1320);
  });

  it('answer', () => {
    const answer = day15(data);
    logAnswer(answer, 15, 1);
    expect(answer).toBe(511498);
  });
});

describe('day 15 part 2', () => {
  it('test cases', () => {
    expect(day15part2(testData)).toBe(145);
  });

  it('answer', () => {
    const answer = day15part2(data);
    logAnswer(answer, 15, 2);
    expect(answer).toBe(284674);
  });
});
