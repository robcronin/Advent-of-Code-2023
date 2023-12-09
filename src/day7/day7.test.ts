import { logAnswer } from '../utils/logging';
import { day7, day7part2 } from './day7';
import { data, testData } from './day7.data';

describe('day 7', () => {
  it('test cases', () => {
    expect(day7(testData)).toBe(6440);
  });

  it('answer', () => {
    const answer = day7(data);
    logAnswer(answer, 7, 1);
    expect(answer).toBe(249748283);
    // 250082481
    // 249748283
  });
});

describe('day 7 part 2', () => {
  it('test cases', () => {
    expect(day7part2(testData)).toBe(5905);
  });

  it('answer', () => {
    const answer = day7part2(data);
    logAnswer(answer, 7, 2);
    expect(answer).toBe(248029057);
  });
});
