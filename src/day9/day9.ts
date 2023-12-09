import { sumArr } from '../utils/array';
import { parseInput } from '../utils/input';

const parseSequences = (input: string[]): number[][] =>
  input.map((line) => parseInput(line) as number[]);

const extrapolateNext = (sequence: number[]) => {
  const graph = [sequence];
  while (!graph[graph.length - 1].every((i) => i === 0)) {
    const last = graph[graph.length - 1];
    const next = [];
    for (let i = 0; i < last.length - 1; i++) {
      next.push(last[i + 1] - last[i]);
    }
    graph.push(next);
  }
  return sumArr(graph, (sequence) => sequence[sequence.length - 1]);
};

export const day9 = (input: string[]) => {
  const sequences = parseSequences(input);
  return sumArr(sequences, extrapolateNext);
};

export const day9part2 = (input: string[]) => {
  const sequences = parseSequences(input);
  return sumArr(sequences, (seq) => extrapolateNext(seq.reverse()));
};
