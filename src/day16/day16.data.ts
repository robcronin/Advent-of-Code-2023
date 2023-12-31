import { parseInput } from '../utils/input';

const testString = `.|...l....
|.-.l.....
.....|-...
........|.
..........
.........l
..../.ll..
.-.-/..|..
.|....-|.l
..//.|....`;
const input = `l../....|.-........|.................|...l....../...............l...............|..................l........|.
.-...../.......-.......|./.........-.....-.......l...|.-...........-.......l.................-....-...........
.l....-l..|...l.....l...................................................................../................-..
.....|.............-.l....../......|.....l......................|...-.....-.........|.-......l................
........./............................-.|..|.........|.....|..................................................
................./.................|.................l...............l..................|.../.....././........
...-..|.........-.............l..|..-......./............l.-....|..|........l...-......l....../...ll..........
..............l..|............/..............|..........................................|............l........
.|...........................-.-.........-..l|...|.......|l............l|.....................................
..........-./.l.....|...................|./............./.-..............|........../.....-/..................
....../.....l/..........l.........|l...........|....--................/................../......-..........-..
-.|.......|...................../................l..................-l........-.....l.........................
...-|................................................l...........-.........l/.-......-.............|..........
.......l../....l..............|..........|.....l............|.............|......./................./....../l.
.....|..................|...|......-.....|..-....|ll.........ll........|....................|............-....
......./........./...-..-|................../...|....................|-.......l-............................./
................../......-...........|...|........./.....l..|......../..../.......|...|.................-.....
.................................../.|..........|...............l..........|...............-.............|/...
.......l.-......-................................/......|..l...l.........../........|......l.........-..-....l
....................|./.....-..../.............|...............-.../.l........-..-............/....|.......-..
...........l...........................l.|.................-...............|........-....................|..|.
..|.-.....l.......|................-.........../.............................................|....//.l........
..-...............l......../..||.....|.....l.|.........................l.....|....-.........../..../..........
..|......../.../.............|..........-...................-................l...l..l......-..................
...../...........-..../...|..l...././..l.|............l....................-|......../........................
/..|............-l..|.................../.../..................../...-........|...............-../......|-....
................/..............................................|.|......-...................|.................
....l..../.../.................ll............................................l........l................../..|.
../.-.............|......|.........l.........-l........../..........|.l.......................................
................./................./l......./........-.........................../........-..........|....l.l.
..l...../............/.............................................-.......--...|.................|...../...-.
..l......................-.......................-......-.l.-/../......./...........................-../......
...............-.................../................../.................-.........................|....l....|.
..../.l|..............-...../...|...../................l-....l..l........|....................-...............
.........................l...-...-|...................l....../........|...............-....../.../......./....
....l......../.-....-........-...../.....-.......-.l...............l.........l............./.....l-...|-..-|..
.../l................-....l.......|..-............-.l.............l..l........-............/......./......../.
..l.....|...............|..l......|..................................|......./.....l...|..|....l../......./...
......|.....././.....-..l..........................-l.............|..../.................................-/...
................|l.......|...|.|....................l..............l........................l.-...||..........
.-.......l...........-...../............/--....-..l-......................./...-.....|..........l/.....-......
...-............-.........l.....................|.........../.........../............|.-.|.....l.../...l-.....
.......................|...........l................./...................l............................|.......
......................|..|.l...............-.../................/.../.../...........................-.|.......
.l.|..........-.|................................../................................/.........-.l....l../.....
./............l..l............................|....../........l.........................l.......l..../.l.....-
....................../.....................|......./....../............................l....................|
..............................||....l........-..............................l..........ll........./.../.......
....l....../....................................-..-........................-................-....|.........l.
.......-......l.-l.|............................................/......-......../.......l.....................
....../...................|........-....-........./...........-.-........./....l..............................
..-/..............l............|........../....................l........-.l...................................
...-......l............/l...........l.........................-.......l.-./...................................
..........-.l.//......................--............l....../.........../-./...................................
.......l-.-..-.....l.............|............l....../........l......../...............-..............|....-..
........./.-.............l.........................-....|l..........|..../...-.........................l.l...l
.........|..l.|.........-...-........-./............|......|....................|.........../...|.............
................./....-..../l..............|../-................|.../..............-./|..-........||..........
...../.......-.............|.........-.....|.............................l........l.........l.................
.............|...../...................../.................ll.....................|l..........-....././......-
.............../..../..../....................../...l.......-..........................ll...-|.........../....
...........|........|........../..-........../......l...........-.......-.......-.......................-..|..
........................l...../.........-.........l.....|...|.........-.....-................-|.../...........
..-...............|...-...........l|.l.......l..............................l./......./..........-............
........................../....../....................................|................................../....
/.......l.................................l./............................|...l..............|...-............|
.....-.....................|.........|................-.l.....-..../..../...............-.........|...........
...|................l../..|.................|............/.....-......../.........-...l-.-.......l............
........................l....-..........|..-....../..............-..........-..|.........l.-...........l......
................................ll......./...................-...........|..................l....|...|../.....
......-.-.|...l.........|.........|....l......................................................................
...................-/....l......../...........|................/......|.-........l|./..|......../.....|..l....
....../........-...l../../..........|...l.....l.............................../......-........-...............
............l...-....|...................l............-.............|..-......|..../-.........................
...........././.-......./............../.....l...-..-.-|.....l../............-..|..|..................--..././
...................-......-...././............./.......ll...../|.................l..............l..|..........
.|.|.../..l|..-../........................................................-...................................
...............-...../.....|...|....l........|......|.............l..........................-...l............
..l.......................-..............l..-...........-...............l.l-....-.............................
..............-............/..-.......|....-/............../........|............../......|..................-
.......|..........|..-..../...................................|-......-..l......./........................l...
.........................................-......./..........|.....l../.../......|./.........................ll
...-.-.........../......./.-........//..|...................|.........-..........|........................-...
........./...../.........l.......l..............-........../-./..|.l...............|....................../...
........-.......ll.........-...l..//...-.........ll....../.-................l.......l...l............/...l....
................-...|......-.....-..|...../....../...-./.............-...........................-|...........
....-..-...........|.................../..l.....|......|...............-.-.|.........../.........../..|....../
....l......................................l................../..|...........-.l.....l.........||...........|.
.........................l.................-...............l.....l.-......................l.......-l.-........
...............-..l................l.................../.............-...................................../..
..-|../.-..|....l............-.......l.../....../...-...../|.........l..l..-..../.-..l....|........l..........
.........................../............|....................-......................................|.........
...../...........|.../........./............./......../.........-.............|..............-.......-|..-...|
..l/......./.l................/.......-............l..l............................................l..........
.......l.l.l......../|......l....................|..l..........-............./.........-...l....|../l......|..
...........l......././.........l......../...............................|........./...|.......................
............|.......|......./.............-..-.........l.....l....................../................./.......
...................................................../...../...............l........-.........................
.|...............-.............-........................|...............................-..|................/.
..............l....../../...........-.-..l........../...........-.....-......................|..../..|.|......
...................../...-.-........................../.........................|.....l.......................
.........l............l..............|.....//........-..l.../..................-.......//..........|......|..l
...../l.........l.......|....|....l...|..........l..............//........-..-.......-............-.-./.......
.........|.........................l...............................|/..........l..l...-..|..................l.
........................l..........|........./..-......l..../..|............l......./......................./|
................l.-...................|.......|/.-|....-.-.../......-.-...-.......-.........../.....-..|......
..........-.l......-.-....-............l..-.......l....-.../l..................|............/...|..../.....-..
|.....................|..l...................||............l...l......./........................-.....|..../..
.|..../.......|..........................................................|....../.....|.....|.....-...........
.......................|..-..l../.....|.........l.................-...........................................`;

export const testData = parseInput(testString) as string[];
export const data = parseInput(input) as string[];
