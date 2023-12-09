import { parseInput } from '../utils/input';

const testString = `Time:      7  15   30
Distance:  9  40  200`;
const input = `Time:        48     98     90     83
Distance:   390   1103   1112   1360`;

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];
