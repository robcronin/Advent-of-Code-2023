import { logAnswer } from '../utils/logging';
import { day20, day20part2 } from './day20';
import { data, testData, testData2 } from './day20.data';

describe('day 20', () => {
  it('test cases', () => {
    expect(day20(testData)).toBe(32000000);
  });

  it('test cases 2', () => {
    expect(day20(testData2)).toBe(11687500);
  });

  it('answer', () => {
    const answer = day20(data);
    logAnswer(answer, 20, 1);
    expect(answer).toBe(886701120);
  });
});

describe('day 20 part 2', () => {
  it('answer', () => {
    const answer = day20part2(data);
    logAnswer(answer, 20, 2);
    expect(answer).toBe(228134431501037);
  });
});
