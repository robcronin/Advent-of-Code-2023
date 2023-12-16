import { Coords, Grid, createGridFromInput } from '../utils/grid';

type Empties = { emptyRows: number[]; emptyCols: number[] };

const getEmpties = (map: Grid<string>): Empties => {
  const emptyRows: number[] = [];
  const emptyCols: number[] = [];
  for (let x = 0; x < map.numRows; x++) {
    let isEmpty = true;
    for (let y = 0; y < map.numCols; y++) {
      if (map.get({ x, y }) !== '.') isEmpty = false;
    }
    if (isEmpty) emptyRows.push(x);
  }
  for (let y = 0; y < map.numCols; y++) {
    let isEmpty = true;
    for (let x = 0; x < map.numCols; x++) {
      if (map.get({ x, y }) !== '.') isEmpty = false;
    }
    if (isEmpty) emptyCols.push(y);
  }
  return { emptyRows, emptyCols };
};

const getGalaxyDistance = (
  galaxy1: Coords,
  galaxy2: Coords,
  empties: Empties,
  expansion: number,
) => {
  const { x: x1, y: y1 } = galaxy1;
  const { x: x2, y: y2 } = galaxy2;

  const passedEmptyRows = empties.emptyRows.filter(
    (row) => row > Math.min(x1, x2) && row < Math.max(x1, x2),
  );
  const passedEmptyCols = empties.emptyCols.filter(
    (col) => col > Math.min(y1, y2) && col < Math.max(y1, y2),
  );

  return (
    Math.abs(x1 - x2) +
    Math.abs(y1 - y2) +
    (expansion - 1) * (passedEmptyCols.length + passedEmptyRows.length)
  );
};

const getTotalGalaxyDistance = (map: Grid<string>, expansion: number) => {
  const empties = getEmpties(map);
  const galaxies = map.findValueInGrid('#');
  let sum = 0;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxy1 = galaxies[i];
      const galaxy2 = galaxies[j];
      sum += getGalaxyDistance(galaxy1, galaxy2, empties, expansion);
    }
  }
  return sum;
};

export const day11 = (input: string[]) => {
  const map = createGridFromInput(input);
  return getTotalGalaxyDistance(map, 2);
};

export const day11part2 = (input: string[], expansion: number) => {
  const map = createGridFromInput(input);
  return getTotalGalaxyDistance(map, expansion);
};
