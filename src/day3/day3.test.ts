import { logAnswer } from '../utils/logging';
import { day3, day3part2 } from './day3';
import { data, testData } from './day3.data';

describe('day 3', () => {
  it('test cases', () => {
    expect(day3(testData)).toBe(4361);
  });

  it('answer', () => {
    const answer = day3(data);
    logAnswer(answer, 3, 1);
    expect(answer).toBe(537832);
  });
});

describe('day 3 part 2', () => {
  it('test cases', () => {
    expect(day3part2(testData)).toBe(467835);
  });

  it('answer', () => {
    const answer = day3part2(data);
    logAnswer(answer, 3, 2);
    expect(answer).toBe(81939900);
  });
});
