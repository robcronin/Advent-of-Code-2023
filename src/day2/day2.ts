import { sumArr } from '../utils/array';

type Game = { id: number; reveals: Reveal[] };
type Color = 'red' | 'green' | 'blue';
type Reveal = Record<Color, number>;
type BagCombo = Reveal;

const parseGames = (input: string[]): Game[] =>
  input.map((line) => {
    const [gameString, revealsString] = line.split(': ');
    const id = +gameString.split(' ')[1];
    const reveals = revealsString.split('; ').map((revealString) => {
      const revealColors = revealString.split(', ');
      const reveal = { red: 0, green: 0, blue: 0 };
      revealColors.forEach((revealColor) => {
        const [num, color] = revealColor.split(' ');
        reveal[color as Color] = +num;
      });
      return reveal;
    });
    return { id, reveals };
  });

const getIsBagComboPossible = (game: Game, bagCombo: BagCombo) =>
  game.reveals.every((reveal) =>
    Object.keys(reveal).every(
      (color) => reveal[color as Color] <= bagCombo[color as Color],
    ),
  );

const getMinComboForGame = (game: Game): BagCombo =>
  game.reveals.reduce(
    (min, reveal) => ({
      red: Math.max(min.red, reveal.red),
      green: Math.max(min.green, reveal.green),
      blue: Math.max(min.blue, reveal.blue),
    }),
    { red: 0, green: 0, blue: 0 },
  );

export const day2 = (input: string[]) => {
  const games = parseGames(input);
  const bagCombo = { red: 12, green: 13, blue: 14 };
  return sumArr(games, (game) =>
    getIsBagComboPossible(game, bagCombo) ? game.id : 0,
  );
};

export const day2part2 = (input: string[]) => {
  const games = parseGames(input);
  return sumArr(games, (game) => {
    const minCombo = getMinComboForGame(game);
    return minCombo.red * minCombo.green * minCombo.blue;
  });
};
