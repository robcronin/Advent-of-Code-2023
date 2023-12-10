import { logAnswer } from '../utils/logging';
import { day10, day10part2 } from './day10';
import {
  data,
  testData,
  testData10,
  testData4,
  testData4Squeeze,
  testData8,
} from './day10.data';

describe('day 10', () => {
  it('test cases', () => {
    expect(day10(testData)).toBe(8);
  });

  it('answer', () => {
    const answer = day10(data);
    logAnswer(answer, 10, 1);
    expect(answer).toBe(6947);
  });
});

describe('day 10 part 2', () => {
  it('test cases 4', () => {
    expect(day10part2(testData4)).toBe(4);
  });
  it('test cases 4 squeeze', () => {
    expect(day10part2(testData4Squeeze)).toBe(4);
  });
  it('test cases 8 ', () => {
    expect(day10part2(testData8)).toBe(8);
  });
  it('test cases 10', () => {
    expect(day10part2(testData10)).toBe(10);
  });

  it('answer', () => {
    const answer = day10part2(data);
    logAnswer(answer, 10, 2);
    expect(answer).toBe(273);
  });
});
