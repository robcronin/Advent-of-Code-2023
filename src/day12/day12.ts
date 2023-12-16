import { sumArr } from '../utils/array';
import { range } from '../utils/looping';

enum Spring {
  OPERATIONAL = '.',
  DAMAGED = '#',
  UNKNOWN = '?',
}
type Record = { springs: Spring[]; groups: number[] };

const parseRecords = (input: string[]): Record[] =>
  input.map((line) => {
    const [springs, groups] = line.split(' ');
    return { springs: [...springs] as Spring[], groups: groups.split(',').map(Number) };
  });

const extendRecords = (records: Record[]): Record[] =>
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

export const getIsValidRecord = (record: Record): boolean => {
  const { springs, groups } = record;
  if (springs.includes(Spring.UNKNOWN)) return false;
  const actualGroups: number[] = [];
  let groupSize = 0;
  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    if (spring === Spring.DAMAGED) groupSize++;
    else if (groupSize > 0) {
      actualGroups.push(groupSize);
      groupSize = 0;
    }
  }
  if (groupSize > 0) actualGroups.push(groupSize);

  return (
    groups.length === actualGroups.length &&
    groups.every((group, index) => group === actualGroups[index])
  );
};

export const getPerms = (num: number, requiredNumDamaged: number) => {
  if (num === 0) return [];
  let perms: Spring[][] = [[Spring.DAMAGED], [Spring.OPERATIONAL]];
  range(num - 1).forEach(() => {
    perms = [...perms.map((perm) => [...perm]), ...perms.map((perm) => [...perm])];
    perms.forEach((perm, index) => {
      perm.push(index < perms.length / 2 ? Spring.DAMAGED : Spring.OPERATIONAL);
    });
  });
  return perms.filter((perm) => {
    const currentNumDamaged = perm.filter((spring) => spring === Spring.DAMAGED).length;
    return currentNumDamaged === requiredNumDamaged;
  });
};

export const getNumValidPerms = (record: Record): number => {
  const { springs, groups } = record;
  const unknowns = springs
    .map((spring, index) => spring === Spring.UNKNOWN && index)
    .filter((index) => index !== false) as number[];

  const currentNumDamaged = springs.filter((spring) => spring === Spring.DAMAGED).length;
  const requiredNumDamaged = sumArr(groups, (i) => i);

  const perms = getPerms(unknowns.length, requiredNumDamaged - currentNumDamaged);

  const validPerms = perms.filter((perm) => {
    const fixedSprings = [...springs];
    unknowns.forEach((unknownIndex, index) => (fixedSprings[unknownIndex] = perm[index]));
    return getIsValidRecord({ springs: fixedSprings, groups });
  });

  return validPerms.length;
};

export const day12 = (input: string[]) => {
  const records = parseRecords(input);
  return sumArr(records, getNumValidPerms);
};

export const day12part2 = (input: string[]) => {
  const records = parseRecords(input);
  const extendedRecords = extendRecords(records);
  console.log(extendedRecords[1].springs.join(''), extendedRecords[1].groups);
  // console.log(getNumValidPerms(extendedRecords[1]));
  return sumArr(records, getNumValidPerms);
};
