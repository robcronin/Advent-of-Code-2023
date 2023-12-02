import { sumArr } from '../utils/array';

const nums: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
};

const getFirstNum = (
  line: string,
  isCountWritten: boolean,
  isReverse?: boolean,
) => {
  if (!isCountWritten) return [...line].find((char) => !Number.isNaN(+char));
  for (let i = 0; i < line.length; i++) {
    const numKey = Object.keys(nums).find((key) => {
      const keyToCheck = isReverse ? [...key].reverse().join('') : key;
      return line.slice(i).startsWith(keyToCheck);
    });
    if (numKey) return nums[numKey];
  }
};

const getNum = (line: string, isCountWritten: boolean) => {
  const first = getFirstNum(line, isCountWritten);
  const last = getFirstNum([...line].reverse().join(''), isCountWritten, true);

  return +`${first}${last}`;
};

export const day1 = (input: string[]) =>
  sumArr(input, (line) => getNum(line, false));

export const day1part2 = (input: string[]) =>
  sumArr(input, (line) => getNum(line, true));
