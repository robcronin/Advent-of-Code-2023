import { sumArr } from '../utils/array';

export enum Spring {
  OPERATIONAL = '.',
  DAMAGED = '#',
  UNKNOWN = '?',
}
type SRecord = { springs: Spring[]; groups: number[] };

export const parseRecords = (input: string[]): SRecord[] =>
  input.map((line) => {
    const [springs, groups] = line.split(' ');
    return { springs: [...springs] as Spring[], groups: groups.split(',').map(Number) };
  });

const printRecord = (record: SRecord, info?: string) => {
  console.log(info || '', record.springs.join(''), ' : ', record.groups);
};

export const extendRecords = (records: SRecord[]): SRecord[] =>
  records.map((record) => {
    const { springs, groups } = record;
    const newGroups = [...groups, ...groups, ...groups, ...groups, ...groups];
    const newSprings = [
      ...springs,
      Spring.UNKNOWN,
      ...springs,
      Spring.UNKNOWN,
      ...springs,
      Spring.UNKNOWN,
      ...springs,
      Spring.UNKNOWN,
      ...springs,
    ];
    return { springs: newSprings, groups: newGroups };
  });

const getCurrentGroups = (springs: Spring[]): { groups: number[]; end: number } => {
  const groups: number[] = [];

  let groupSize = 0;
  let end = 0;
  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    if (spring === Spring.UNKNOWN) return { groups, end };
    if (spring === Spring.DAMAGED) groupSize++;
    else if (groupSize > 0) {
      groups.push(groupSize);
      groupSize = 0;
      end = i;
    }
  }
  if (groupSize > 0) groups.push(groupSize);
  return { groups, end };
};

const getMemoKey = (record: SRecord) => `${record.springs.join('')} : ${record.groups.join(',')}`;

export const getRecNumPerms = (record: SRecord, memo: Map<string, number> = new Map()): number => {
  const memoKey = getMemoKey(record);
  if (memo.has(memoKey)) return memo.get(memoKey);

  const { groups: currentGroups, end } = getCurrentGroups(record.springs);
  const isStartValid = currentGroups.every((group, i) => group === record.groups[i]);
  if (!isStartValid) {
    memo.set(memoKey, 0);
    return 0;
  }
  if (currentGroups.length === record.groups.length && !record.springs.includes(Spring.UNKNOWN)) {
    memo.set(memoKey, 1);
    return 1;
  }

  if (record.springs.length < sumArr(record.groups, (i) => i) + record.groups.length - 1) {
    memo.set(memoKey, 0);
    return 0;
  }

  const remainingGroups = record.groups.slice(currentGroups.length);
  const nextUnknown = record.springs.findIndex((spring) => spring === Spring.UNKNOWN);
  if (nextUnknown === -1) {
    memo.set(memoKey, 0);
    return 0;
  }

  const damageOption = [...record.springs];
  damageOption[nextUnknown] = Spring.DAMAGED;
  const damageRecord = { springs: damageOption.slice(end), groups: remainingGroups };
  const damagedPerms = getRecNumPerms(damageRecord, memo);

  const operationalOption = [...record.springs];
  operationalOption[nextUnknown] = Spring.OPERATIONAL;
  const operationalRecord = { springs: operationalOption.slice(end), groups: remainingGroups };
  const operationalPerms = getRecNumPerms(operationalRecord, memo);

  memo.set(memoKey, damagedPerms + operationalPerms);
  return damagedPerms + operationalPerms;
};

export const day12 = (input: string[]) => {
  const records = parseRecords(input);
  return sumArr(records, (i) => getRecNumPerms(i));
};

export const day12part2 = (input: string[]) => {
  const records = parseRecords(input);
  const extendedRecords = extendRecords(records);
  return sumArr(extendedRecords, (i) => getRecNumPerms(i));
};
