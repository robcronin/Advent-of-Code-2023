type Race = { time: number; distanceRecord: number };

const parseRaces = (input: string[]): Race[] => {
  const [timeString, distanceString] = input;
  const times = timeString.match(/\d+/g)?.map(Number) as number[];
  const distances = distanceString.match(/\d+/g)?.map(Number) as number[];

  return times.reduce(
    (acc: Race[], time, index) => [
      ...acc,
      { time, distanceRecord: distances[index] },
    ],
    [],
  );
};

const parseBigRace = (input: string[]): Race => {
  const [timeString, distanceString] = input;
  const time = timeString.match(/\d+/g)?.join('') as string;
  const distance = distanceString.match(/\d+/g)?.join('') as string;
  return { time: +time, distanceRecord: +distance };
};

const getDoesBeatRecord = (race: Race, holdTime: number) => {
  const distance = holdTime * (race.time - holdTime);
  return distance > race.distanceRecord;
};

export const binSearchStart = function (
  start: number,
  end: number,
  race: Race,
): number {
  if (start > end) throw new Error('Bad binary search');
  const mid = Math.floor((start + end) / 2);
  const doesBeatRecord = getDoesBeatRecord(race, mid);
  const doesBeatRecordLower = getDoesBeatRecord(race, mid - 1);

  if (doesBeatRecord && !doesBeatRecordLower) return mid;
  if (doesBeatRecord && doesBeatRecordLower)
    return binSearchStart(start, mid - 1, race);
  else return binSearchStart(mid + 1, end, race);
};

const binSearchEnd = function (start: number, end: number, race: Race): number {
  if (start > end) throw new Error('Bad binary search');
  const mid = Math.floor((start + end) / 2);
  const doesBeatRecord = getDoesBeatRecord(race, mid);
  const doesBeatRecordUpper = getDoesBeatRecord(race, mid + 1);

  if (doesBeatRecord && !doesBeatRecordUpper) return mid;
  if (doesBeatRecord && doesBeatRecordUpper)
    return binSearchEnd(mid + 1, end, race);
  else return binSearchEnd(start, mid - 1, race);
};

const getNumOkHoldTimes = (race: Race) => {
  const start = binSearchStart(0, race.time, race);
  const end = binSearchEnd(0, race.time, race);
  return end - start + 1;
};

export const day6 = (input: string[]) => {
  const races = parseRaces(input);
  return races.reduce((margin, race) => margin * getNumOkHoldTimes(race), 1);
};

export const day6part2 = (input: string[]) => {
  const bigRace = parseBigRace(input);
  return getNumOkHoldTimes(bigRace);
};
