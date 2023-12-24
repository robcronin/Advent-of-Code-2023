import { logAnswer } from '../utils/logging';
import { day17, day17part2 } from './day17';
import { data, smallTestData, testData } from './day17.data';

describe('day 17', () => {
  it('small test cases', () => {
    expect(day17(smallTestData)).toBe(21);
  });
  it('test cases', () => {
    expect(day17(testData)).toBe(102);
  });

  it.skip('answer', () => {
    const answer = day17(data);
    logAnswer(answer, 17, 1);
    expect(answer).toBe(694);
  });
});

describe('day 17 part 2', () => {
  it('test cases', () => {
    expect(day17part2(testData)).toBe(94);
  });

  it.skip('answer', () => {
    const answer = day17part2(data);
    logAnswer(answer, 17, 2);
    expect(answer).toBe(829);
  });
});
