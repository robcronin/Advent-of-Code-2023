import { parseInput } from '../utils/input';

const testString = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
const input = `O.OO.#...#.O#...#...O..O.#O..O.##.....###O.O##O.O....OO.....##..##.#..O#.........O#..#..O...#O.....O
.....###.O....#.#O.....##..O##O.......##......O..#..##.#.O#...O...O.O....#.###O.OO#.#O.#.#..O..OOO..
OO......#.#..##O........O.###..#.#........O#..O....O#.#.##.OO.....O#.........###O......#..#.O..#....
..#O...O....#.#.#O#....#.O#....OO.OO.O#...O##.O........O.#O.OO.O.....O.#.O.#....O.....O..OO.OO...O.#
..#O...#.....O#O...###O......O#.##O..O#.O.O.#..#O#.O....O..O#...OO...O..#.O.......O.##OO.#...#...##.
.#......O.OO#....O#O#OO.O..O......OOO..O....O....#OO....O...#.O.O.O..O...OOOO...#......O..#O..#O....
..O.#.O.#..OO...........#..#......#.#...#...O...#...#...O##..O..#..O.#...O..#.O...#....#..OO..O..#.#
.##..O..##O......#...##....#..#..O....#..##.#.O#....O#..#...O.O....O.O.........OO.#.OO......O.......
..##O.O...O.O..O##OO..#.O..O.#...O..#..#.O...O....##...#O...O......#.....O##O#..O.#..#..O...#...#.O.
O..##...##...#.#.OO#...OO#O..O...O.#O..#.O......O##......#O..O..OOOOOO..O.##.O...#O.....O##......OO.
.........O..O#.....#...#......OO###OO.O.O#...#.O....O..##..O#.....O.#.##O.#......#.O.....OO#.#..##O.
OO#O...#...OO.O####.OO.#.#.......O......O#..O#..#...#O....#.....OO#O......#O#...O#.OO......O....O#..
.O.........#.#O#....#OO..#.........OO....O...#.O.O.O.OOO.O..O.....O.#....OOOO....OO.......#.#.O.##..
....#.....#.O.#O...O#OO#...##.#.#..O.O.O....#O.#.#.O...#O#O.O#O...O..#OO..O###.OO..#.....OOO.#......
#OOO..OO.O.O..O..O....#....O..O.#...O...O...##.O##..O...OOOOO#.........OOO##..#...OO#O#O.....O...##.
.......O#..#OO.O.O..OO.O#..O.......##....OO#.O..O..O#...#..#...O.##.....#..........#.....#.O...#...O
......O.#.O...O.......O#..O..OOO#...#........###.O..#....O.O#.OO.O..#.O#O.O.O.......O.##.OO......O.#
O....O..........#....##.###..#...O#.O..O.##.O....O..O..O..##.O.O#OO...O.#.O##..#.#.......#.O..O..O.O
..O#..O.#.##..O#..O#..O..O..O....OO...O##..#...O.OO..#.#.#.###O.O...#O.##..#.....#..#O.O.O...#O.O#..
..O.##........OO.....OO.O..#.....OO.O..#...#..OOO..#....#....#.OO.#.#........OO...O.#O....##O..OOOO#
.........#.#.OO.#O...#...O#........O..#.#........O......O#.OO..#..#....O##OO.......O..O.O.O.........
#..O..#..OO.O.O....O..O.O.#.O.O#O...O.OO..#......OO.#..O....#.....#OOO#.OO#.OO........###....O.....O
..O..O.O.O.....O..#.O..##.O..##..O###........O.O..#...O....OOO#.OO.#O...O..##....#.#O...#..O...O...#
O#...O..O.#.#......O..O.#OO.....O..#.......O.##O........#O.OO..#..O.##..O.#...O...#O.....#.#..OO##..
O.OO..O....O.#..O##O.#.O.O#O..##...O..##...#.O#.....O##.#O..O.O.....O....##..O.###......#........O..
.....##.#.......O.OO....#..##............##..O..#.......O..O..#.O...O#..O.O.##..O..OO.O.....O...O...
##.O.#....O..OO..OOO.OO.##..OO.OO.#...O#.....#...##...O#....OO..O.O...O...O.#....OO...#..#O#.##..#..
........OOO....O...#.O...O..#......O....#O#.#O...O#.O........O.O...OO#....O..#.#.#O.O...OO....O.#O..
OO...O...O..#.OO..O#.OO###..O.......#..O..O.####O....O.O.O#O.#..O..##OO..O..#....#..O#O....#..O...O.
..O....#.O.O....O...#.........#..O#.#..OO....#...##.OO..OO.O...OOO..O..O#.###.......O#...#....OO...#
.O...OO.O.O...#.......#.O.O.....O...OOOO.#O.O..O..OOO.OO...............#O...##O..OOO##....#O.O#.##..
O....O...O.#...........#..#.#OO###O.O...#.O#..O.....O...O....O...#...O.OOO.OO#..OO...#..OOOO...#..#.
....O...OO.#.O...O..#....O.O.#O..O....O..O..##O.#O....O..O.....O.......OO.......#OO#.##.O.#.O..#.##O
#OO#.#....###O#..OO..#..O.......O.O...OO#.#O.....O.O##.O...#.##O#...O#......#..#..O#O.O.....OO.O#.O.
...O#....O...O......#..O#O..OO.O#.OO.#.......#...O..O.....O.#O..O..O.....#OO#.O..#....#O.#O..#......
..O.....O.......#O....O#...##.....#..O.#....#.#.#O#.#....O....#..O.O......OO....O.#OO#OO.....O......
.#..O..#..O##...#O.#.##O#.#.#O....O#..###.OO..##..#..........O#O.#..#....O...##.......O.O.O##O#..#O.
.#.....O..O.#..#..O....O...#.....#O.O.....OO.#..#......##........O.#.#......#...OO#....O#O.....#..O#
#.....O.....O...O..##O.OO#OO......O#..O......O...O...#.....OO..#...O..#.....##.#.O...#..#O......OO.O
.#..#.#.#...O#.......#.O....O..#.#.#.....O...................#.O...OOO#.....O.O.....O..O.#.....#.O.O
O....O.....O.....O#O...O.O.O#O.#O..OO#OO..#OO.OO##.....##O#.O.O..#.....O..OO.##.#.......#...O..OO.O.
.O#..O..#....##......O....#.#.#......#........##...#....#.......#.....O......##.#.....O.O....OO#.O..
....OO.OO#...O..#O#O.#.O.#..OO...OOO...#O.#..#..#.#O...#O.#.O..##..O.##..O#.#.....#..O...#.O...O#.O#
....O#....O.O#OOO...#.#.........O.O....#..O...#...#.....O.O.O.O....#.OO.##O.....#.#.#.#O..O#.O.#.OOO
O#OO..O.#.......###..OO..O........O.##O.#O##..O...O.#OO.....#...O......O.OO...O..OO....O..O..#.#...O
.#.O.O.O.#......O......##O...OO.....O....O#.....O#....#.......#O..#...##..O..#O.O.O..O....O.........
...#.........OO..O.O#..O.#....#...OO##...O..OO.......#.#OO..#...#..##.#...OO#...#O.#...O.....O...#..
#.....#O......O....O#.....#.#O.OO..........O.O...#....#.###O.O..O...#...#..#....O..O..O#.O.........#
O.O.O...O...#.....#.#....O.O.O.....OO....#..OOO......O.O.......O#O...#.#O##O.####.........O#O.......
O.O...........O#...OO..#O.O.O......O.......##.O...O..##...O.#OO...#OO...#...#O#.##O.#......O.##....O
O..#...........O..O......OOO....#....OO.O...#O..O.O#......#...........#O...#O..O....#.#.#..#...#O...
..O.....#...#...O.#.O..##.........O#..##.....#O.........................##...#.#..#.OO#O...#OOO#O.##
OO..O.O.....O#.O....O##...O.O#.OO.#..O.....O...##.O#..O......OO..#..O.....##.....OO#OO...#O......O.O
.OO...#....#O..#.....OO..O.O.......O#...O#..O#..#.O....#.O.#.O...O.#.O.#...#..OO.......O#....OO..O..
O.OO..#.OOO.#.O#...#.#..O..O#.#.#.#.....#.O#..O....O..OO...O..#..#....OO#O.#......O#..##...O...O.#O.
....#....#...OO#...O.O#OO.#.#OOO..O...OO.O..#.O#..#..O.O..#.#........OO#O.#.#.#.....OO......##.#.O..
.#.O.OOO#OOO...##O#.#...#...##O.#...O.......###O#.##..O#..#.##...O..O.O.........O..#..O##......#.##.
O...#..#....#O..##..O.O##..O.O###O.......O...#.O#.O#..O...#.#.O..#.....#.....O..O..OOO.OOO..O..OOO..
...O#.O....O.O.#.O..#.O..####...OO......#OO....O#....O..O...O...OO..OO.OOO#....#..#.O.O..#..#.....O.
O.O##O.O.O.#.O.#........#O......#O.##...##OO.......O#..#..#.O....OO........#.#O..#O.........OO.O#..O
.......#.....O...O.O.#O##.O.OO#.....O.O#O....O.#.##.#.......##.O.O.###O...O.O#O##...#...#...O..#....
.O#...#O...#....O##.O..........O.O.#..O.O..OOOOO.......OO.O#...O...O...#O###OOO.#OOO..............O#
O.#.#.......OO..OO.#.O#.....#.O#O...#......O....O...O.O.....OO.#O.......#..O...O.....##OO#.....OO#.#
...O#...#.....#..#O.#..O..O.#O#O.#...OO#O.O....O.#...#O#O....#......O..#O...#....O..O.O........#..#.
.O.......#..O#...O....................#.##O......#.#......####..OO#...OO.##..#........#.OO..#OOO.###
......O...O..O##.......O...O##O.O....#..#.##...#OO..##..........#..............##O.......O...#O###O.
.........#..OO.#.......OO...O....#O.#.......O..##...###..O...#OO.O.O...#...#OO....##O.....#O.O..#...
..#....O..O......#.#....OO#....#...O.#.OO.O#.....O#.#......O.#O.........O....O....#..O.........O....
.OO.......#.....O.O..O#....O.#.....O..O#O...O#.....OOO....##..O.O..O#.OO...#....#...O..#..##..#..#.O
O..#..OO##.#..OOO..#...#.OOO..O..##..O..##O.......O.O..O...#.O...#..###.#.#.#...#O..O......#.O#....#
...O..#O..O..OO.#....#...##...O...#.......OOOO#...O.###.O.......#O.O#.##.##O..#...O...O.O..#....OO..
OO.........OO...O.O............O....O.O...O.O.O.......O.OOO.O#....#O.O..#.....O#...#...#....#......O
#.OO#........OO..#OO.....O.#...#..#O.O...O.....#..O.......O...O..O...O.O.O....##...O....O.OO.....#.O
..O....#..O....O#.....#..#O......O......#...#O.......O.O...##O.#...O#..O#.#O###...#.OOO.#O...O#....O
.#.#..OO.#..O###....O.#......O..OO...O.O..O.#.O....O.#..O.....O#....O....#.......O.O...O......OOO.#.
...OO#.OO#O....O....O.O.#.O.#O..#.O#...###...#......#...OO##.#.#..O#...#....#.#.#.OO....O...OOOO...O
..O.#..O...O...O#O......##.....O...O..O....#....O..#OO.#.O......#O.OOO.O.O..#........##...#O.#O...O.
..O.OO.....O...#..O..#...O...O..#O..O#..##.....#....#.#O.#.......#O##....O.OOOOOOOO#.O...O.O#..#O##.
O.OO.####..OO...OO.O........OO#.O.O...#....#..OO......O.O...O..#.##....O....O......#O........#O.O#..
.#O.#...#.#...OO#.O.#O.....O##.O.OO.O..#..#O.....O...#.O.O#.....###.....#O.O.......O.#O.O#..#.O..#..
.O......O........O...#O....##.....#O..OO.O..#.....O.#..O...#O#.#..##.#O..........O.O.O..#....#..#..#
.OOO..O...#O.O#..#....O......O.O...O#O.....#..OO......OO.#O..O..O###......O.#.#.#.O....#...O........
.##.....#OO#.##.....#....O..O.....OO..OO##...O...O#.##.OO#....#.......#...O.O.#.O........OO...OO....
......OO#.....OO#OO......#.O....##..O.O#...O....#..O.O.#O.#...#.O..#.O.O#O....O.O..O.O.O.#OO.##.OO.#
.O..OO##....O###......####.OO...O#..#..##.##.O..#..##OOO...#..#O##.#..#........#...#....O.......#.OO
..O..O.O..#....#.#O.#.#OOO....O.##.....OO....#..O...#...#O.........O....O..#..........#.O..O.OO.O##O
OO.......#...O#.#.......O...O.OO#.O.O.....O.....#...##..#....#.......O#.#O..O.O.......##...OO..#O...
#O#....#.#.O..#...OO...##.#.#.O#O#...#........O..OO..#..O#..O..O.O.#O...#.....#O.#O.O#..OOO#.O.O..#.
.#O...OO.##.#.....O...O#O................O.O..O#...#..O.#OO..O....OO...O.#...O#.#.O...O#....OO#.#...
O#...###.OO.O...O.O#O#..O.O...O.#.....O......O...#...O.O....#...O...O#.#...##....O...........#O...#.
.....#OO.#.OO...##.O....#OO#.....O..##...OO#.......O...##..#....#..#..##.#O.O##..O.#.O.#.O#OO.O.#.#O
O##.#..O.OO..O.O.OOO.O...O..O.O..O.O.O..#.........#.....OO.#.......O#....#.......#O.#.O..#...O#..OOO
.#....O.O..O##...#.OO#.O#..#OO..O.#...O....##.#O.O#O#...#.........O.#..#....OO..O.#........##O.##O..
.....#....OO#...#.OO.O.O....O..#O.#.O#.O##.O..#.#O.#..O.#.O..O#.#.O.O.O#O....OO#...O......OO#..OO#O.
O..O.#O..OOO..O...O...#.......#O.OO....O..#...O.....O.#.OO....#.O.OO...O#...OOO###.O..#.....O..O#.#.
.OO......O#O.......OOO.......O..O...........O..##.....OO..##...O.O.O...O.O.O.....O..OO..O#....#.O..#
O....#....#O.####.O...#....O....#O..#O...O.O....O.O#..O.........O#.......O....O..O...#.##..O.OO.OO..
.O###O...#OO.OO........O.O#.O.O....O.O...##.O#..###..........#..O#.O..O.OO.O..#O#OO..O#.O.##.O.OOO##
#.#O#..O.#...O#..#.......O#..#...#...#O..#.O.....O...O.......#O.#...#OO.O....OO..O...#.#....#O......
..O.#O.O.O#..#.O...#.....#..O..##..O......O.OO.O.###.....#.O..O...OO#.OO.....#...OO#O..#..#O#...O..O`;

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];
