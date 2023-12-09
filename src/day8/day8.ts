import { parseInput } from '../utils/input';
import { getAllLcm } from '../utils/maths';

type Network = { id: string; left: string; right: string };
type Documents = { instructions: string; networks: Record<string, Network> };

const parseDocuments = (input: string[]): Documents => {
  const [instructions, networkString] = input;
  const networks = parseInput(networkString).reduce((acc, line) => {
    const groups = (line as string).match(
      new RegExp('([A-Z0-9]+) = \\(([A-Z0-9]+), ([A-Z0-9]+)\\)'),
    );
    if (!groups) throw new Error(`${line} is not a valid network`);
    const [_, key, left, right] = groups;
    return { ...acc, [key]: { id: key, left, right } };
  }, {});
  return { instructions, networks };
};

const getStepsToDest = (
  documents: Documents,
  start: string,
  destEndsWith: string,
) => {
  const { networks, instructions } = documents;
  let steps = 0;
  let pos = start;
  while (!pos.endsWith(destEndsWith)) {
    const network = networks[pos];
    const direction = instructions[steps % instructions.length];
    pos = direction === 'L' ? network.left : network.right;
    steps++;
  }
  return steps;
};

// Assumption that problem is created loops verified by testing
const getStepsToAllDest = (documents: Documents) => {
  const startNodes = Object.keys(documents.networks).filter((network) =>
    network.endsWith('A'),
  );
  const loops = startNodes.map((start) =>
    getStepsToDest(documents, start, 'Z'),
  );
  return getAllLcm(loops);
};

export const day8 = (input: string[]) => {
  const documents = parseDocuments(input);
  return getStepsToDest(documents, 'AAA', 'ZZZ');
};

export const day8part2 = (input: string[]) => {
  const documents = parseDocuments(input);
  return getStepsToAllDest(documents);
};
