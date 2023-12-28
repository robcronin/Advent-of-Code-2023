import { logAnswer } from '../utils/logging';
import { day19, day19part2 } from './day19';
import { data, testData } from './day19.data';

describe('day 19', () => {
  it('test cases', () => {
    expect(day19(testData)).toBe(19114);
  });

  it('answer', () => {
    const answer = day19(data);
    logAnswer(answer, 19, 1);
    expect(answer).toBe(492702);
  });
});

describe('day 19 part 2', () => {
  it('test cases', () => {
    expect(day19part2(testData)).toBe(167409079868000);
  });

  it('answer', () => {
    const answer = day19part2(data);
    logAnswer(answer, 19, 2);
    expect(answer).toBe(138616621185978);
  });
});
