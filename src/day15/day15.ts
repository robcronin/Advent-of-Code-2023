import { sumArr } from '../utils/array';

type Boxes = Record<number, [string, number][]>;

const runAlgorithm = (line: string) => [...line].reduce((acc, curr) => ((acc + curr.charCodeAt(0)) * 17) % 256, 0);

const getLensLocation = (input: string[]) =>
  input.reduce((boxes: Boxes, line) => {
    const [label, focal] = line.split(/=|-/);
    const box = runAlgorithm(label);

    if (line.includes('=')) {
      if (boxes[box]) {
        const existing = boxes[box].find((lens) => lens[0] === label);
        if (existing) existing[1] = +focal;
        else boxes[box].push([label, +focal]);
      } else boxes[box] = [[label, +focal]];
    } else if (boxes[box]) boxes[box] = boxes[box].filter((lens) => lens[0] !== label);

    return boxes;
  }, {});

const getFocusingPower = (boxes: Boxes) =>
  sumArr(Object.keys(boxes), (boxNum) =>
    sumArr(boxes[+boxNum], (lens, index) => (+boxNum + 1) * (index + 1) * lens[1]),
  );

export const day15 = (input: string[]) => sumArr(input, runAlgorithm);

export const day15part2 = (input: string[]) => {
  const boxes = getLensLocation(input);
  return getFocusingPower(boxes);
};
