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

const findReflection = (pattern: Pattern, isRow: boolean, old?: number): number | undefined => {
  const limit = isRow ? pattern.numRows : pattern.numCols;

  for (let l = 1; l < limit; l++) {
    let offSet = 1;
    let isMatching = true;
    while (l - offSet >= 0 && l + offSet - 1 < limit && isMatching) {
      isMatching = getIsMatchingLine(pattern, l - offSet, l + offSet - 1, isRow);
      offSet++;
    }
    if (isMatching && l !== old) return l;
  }
};

const getSummaryScores = (patterns: Pattern[], getSmudge?: boolean) => {
  let score = 0;
  let smudgeScore = 0;
  patterns.forEach((pattern) => {
    const col = findReflection(pattern, false);
    const row = findReflection(pattern, true);
    if (col) score += col;
    if (row) score += row * 100;

    if (getSmudge) {
      let nextSmudgeScore;
      for (let r = 0; r < pattern.numRows; r++) {
        for (let c = 0; c < pattern.numCols; c++) {
          if (nextSmudgeScore) break;
          let oldValue = pattern.get({ x: r, y: c }) as Value;
          let newValue: Value = oldValue === '#' ? '.' : '#';
          pattern.set({ x: r, y: c }, newValue);

          const ncol = findReflection(pattern, false, col);
          const nrow = findReflection(pattern, true, row);
          if (ncol) nextSmudgeScore = ncol;
          if (nrow) nextSmudgeScore = nrow * 100;
          pattern.set({ x: r, y: c }, oldValue);
        }
      }
      if (!nextSmudgeScore) throw new Error('No smudge reflection found');
      smudgeScore += nextSmudgeScore;
    }
  });
  return { score, smudgeScore };
};

export const day13 = (input: string[]) => {
  const patterns = parsePatterns(input);
  return getSummaryScores(patterns).score;
};

export const day13part2 = (input: string[]) => {
  const patterns = parsePatterns(input);
  return getSummaryScores(patterns, true).smudgeScore;
};
