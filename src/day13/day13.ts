import { sumArr } from '../utils/array';
import { Grid, createGridFromInput } from '../utils/grid';
import { parseInput } from '../utils/input';
import { range } from '../utils/looping';

type Value = '.' | '#';
type Pattern = Grid<Value>;

const parsePatterns = (input: string[]): Pattern[] =>
  input.map((line) => {
    const stringGrid = parseInput(line) as string[];
    return createGridFromInput(stringGrid) as Grid<Value>;
  });

const getIsMatchingLine = (pattern: Pattern, l1: number, l2: number, isRow: boolean) => {
  if (isRow) {
    return range(pattern.numCols).every(
      (y) => pattern.get({ x: l1, y }) === pattern.get({ x: l2, y }),
    );
  }
  return range(pattern.numRows).every(
    (x) => pattern.get({ x, y: l1 }) === pattern.get({ x, y: l2 }),
  );
};

const findReflection = (pattern: Pattern, isRow: boolean): number | undefined => {
  const limit = isRow ? pattern.numRows : pattern.numCols;
  for (let l = 1; l < limit; l++) {
    let offSet = 1;
    let isMatching = true;
    while (l - offSet >= 0 && l + offSet - 1 < limit && isMatching) {
      isMatching = getIsMatchingLine(pattern, l - offSet, l + offSet - 1, isRow);
      offSet++;
    }
    if (isMatching) return l;
  }
};

const getSummaryNumber = (patterns: Pattern[]): number =>
  sumArr(patterns, (pattern) => {
    const col = findReflection(pattern, false);
    const row = findReflection(pattern, true);
    if (col) return col;
    if (row) return row * 100;
    throw new Error('No reflection found');
  });

export const day13 = (input: string[]) => {
  const patterns = parsePatterns(input);
  return getSummaryNumber(patterns);
};

export const day13part2 = (input: string[]) => {
  return 13;
};
