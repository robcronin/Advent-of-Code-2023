import { sumArr } from '../utils/array';
import { Grid, createGridFromInput } from '../utils/grid';

const isNumber = (char: string) => !Number.isNaN(+char);

const getSumPartNums = (grid: Grid<string>) => {
  let partNumSum = 0;
  const gears: Record<string, number[]> = {};

  for (let x = 0; x < grid.numRows; x++) {
    for (let y = 0; y < grid.numCols; y++) {
      let partNum = '';
      const neighbours = [];

      while (isNumber(grid.get({ x, y }))) {
        partNum += grid.get({ x, y });
        neighbours.push(...grid.getNeighbours({ x, y }, true));
        y++;
      }

      if (isNumber(partNum)) {
        const hasSymbolNeighbour = neighbours.some(
          (coord) => !isNumber(grid.get(coord)) && grid.get(coord) !== '.',
        );

        if (hasSymbolNeighbour) partNumSum += +partNum;

        neighbours
          .filter((coord) => grid.get(coord) === '*')
          .forEach((gear) => {
            const key = `${gear.x},${gear.y}`;
            if (gears[key]) {
              if (!gears[key].includes(+partNum)) gears[key].push(+partNum);
            } else gears[key] = [+partNum];
          });
      }
    }
  }

  const gearRatioSum = sumArr(Object.values(gears), (parts) =>
    parts.length === 2 ? parts[0] * parts[1] : 0,
  );

  return { partNumSum, gearRatioSum };
};

export const day3 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getSumPartNums(grid).partNumSum;
};

export const day3part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getSumPartNums(grid).gearRatioSum;
};
