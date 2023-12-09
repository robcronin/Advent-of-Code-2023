import { logAnswer } from '../utils/logging';
import { day4, day4part2 } from './day4';
import { data, testData } from './day4.data';

describe('day 4', () => {
  it('test cases', () => {
    expect(day4(testData)).toBe(13);
  });

  it('answer', () => {
    const answer = day4(data);
    logAnswer(answer, 4, 1);
    expect(answer).toBe(27845);
  });
});

describe('day 4 part 2', () => {
  it('test cases', () => {
    expect(day4part2(testData)).toBe(30);
  });

  it('answer', () => {
    const answer = day4part2(data);
    logAnswer(answer, 4, 2);
    expect(answer).toBe(9496801);
  });
});
