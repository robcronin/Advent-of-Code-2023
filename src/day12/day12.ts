import { maxArr, sumArr } from '../utils/array';
import { range } from '../utils/looping';

enum Spring {
  OPERATIONAL = '.',
  DAMAGED = '#',
  UNKNOWN = '?',
}
type Record = { springs: Spring[]; groups: number[] };
type Option = { index: number; numPerms: number };

export const parseRecords = (input: string[]): Record[] =>
  input.map((line) => {
    const [springs, groups] = line.split(' ');
    return { springs: [...springs] as Spring[], groups: groups.split(',').map(Number) };
  });

export const extendRecords = (records: Record[]): Record[] =>
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
    actualGroups.every((group, index) => group === groups[index])
  );
};

export const getIsValidStartRecord = (record: Record, numToCheck: number): boolean => {
  const { springs, groups } = record;
  const actualGroups: number[] = [];
  let groupSize = 0;
  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    if (spring === Spring.UNKNOWN) throw new Error('Unknown found');
    if (spring === Spring.DAMAGED) groupSize++;
    else if (groupSize > 0) {
      actualGroups.push(groupSize);
      groupSize = 0;
    }
  }
  if (groupSize > 0) actualGroups.push(groupSize);

  return (
    actualGroups.length === numToCheck &&
    actualGroups.every((group, index) => group === groups[index])
  );
};

export const getFirstGroupSize = (record: Record): number => {
  const { springs, groups } = record;
  let groupSize = 0;
  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    // if (spring === Spring.UNKNOWN) break;
    if (spring === Spring.DAMAGED) groupSize++;
    else if (groupSize > 0) break;
  }

  return groupSize;
};

export const getGroupSizePossible = (record: Record, num: number): number => {
  const { springs, groups } = record;
  let groupSize = 0;
  for (let i = 0; i < springs.length; i++) {
    const spring = springs[i];
    // if (spring === Spring.UNKNOWN) break;
    if (spring === Spring.DAMAGED) groupSize++;
    else if (groupSize > 0) break;
  }

  return groupSize;
};

export const getPerms = (num: number, requiredNumDamaged?: number) => {
  if (num === 0) return [[]];
  let perms: Spring[][] = [[Spring.DAMAGED], [Spring.OPERATIONAL]];
  range(num - 1).forEach(() => {
    perms = [...perms.map((perm) => [...perm]), ...perms.map((perm) => [...perm])];
    perms.forEach((perm, index) => {
      perm.push(index < perms.length / 2 ? Spring.DAMAGED : Spring.OPERATIONAL);
    });
  });
  if (requiredNumDamaged) {
    return perms.filter((perm) => {
      const currentNumDamaged = perm.filter((spring) => spring === Spring.DAMAGED).length;
      return currentNumDamaged === requiredNumDamaged;
    });
  }
  return perms;
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

const getBigNumPermOptions = (record: Record, numGroups: number): Option[] => {
  // console.log('getBigNumPermOptions', record, numGroups);
  const { springs, groups } = record;

  const options: Option[] = [];
  let length = 1;

  const requiredSizeLeft = sumArr(record.groups.slice(1), (group) => group + 1) - 1;
  const firstGroupSize = getFirstGroupSize(record);
  // if (firstGroupSize > groups[0]) return options;
  while (true) {
    if (length > springs.length - requiredSizeLeft) return options;
    const shortenedSprings = springs.slice(0, length);
    const unknowns = shortenedSprings
      .map((spring, index) => spring === Spring.UNKNOWN && index)
      .filter((index) => index !== false) as number[];

    if (shortenedSprings.length === springs.length && unknowns.length === 0) {
      options.push({ index: length, numPerms: 1 });
    }

    const perms = getPerms(unknowns.length);
    const validPerms = perms.filter((perm) => {
      const fixedSprings = [...shortenedSprings];
      unknowns.forEach((unknownIndex, index) => (fixedSprings[unknownIndex] = perm[index]));
      const isValidStart = getIsValidStartRecord({ springs: fixedSprings, groups }, numGroups);
      const isValid =
        isValidStart &&
        (fixedSprings[fixedSprings.length - 1] === Spring.OPERATIONAL ||
          shortenedSprings.length === springs.length);
      return isValid;
    });
    if (validPerms.length > 0) {
      options.push({
        index: length,
        numPerms: validPerms.length,
      });
    }
    if (options.length > 0 && validPerms.length === 0) break;
    length++;
  }

  // console.log({ options });
  return options;
};

export const getBigNumPerms = (record: Record) => {
  const { springs, groups } = record;

  let options: Option[] = [{ index: 0, numPerms: 1, groups: 0 }];
  for (let g = 0; g < groups.length; g++) {
    // console.log(' in g loop', options);
    const newOptions: Option[] = [];
    options.forEach((option) => {
      const shortSprings = springs.slice(option.index);
      const shortGroups = groups.slice(g);
      // console.log(
      //   'about to call getBigNumPermOptions for',
      //   option,
      //   'with',
      //   shortSprings,
      //   shortGroups,
      // );
      const shortOptions = getBigNumPermOptions({ springs: shortSprings, groups: shortGroups }, 1);
      // console.log('in option loop', {
      //   g,
      //   shortOptions,
      //   shortSprings: shortSprings.join('').slice(0, 10),
      // });
      shortOptions.forEach((shortOption) => {
        newOptions.push({
          index: option.index + shortOption.index,
          numPerms: option.numPerms * shortOption.numPerms,
          groups: g,
        });
      });
    });
    options = newOptions.reduce((acc: Option[], newOption) => {
      const current = acc.find((opt) => opt.index === newOption.index);
      if (current) {
        current.numPerms = Math.max(newOption.numPerms, current.numPerms);
        return acc;
      }
      return [...acc, newOption];
    }, []);
    // options = newOptions;
  }
  console.log({ options });
  return maxArr(options, (option) => option.numPerms);
  // return sumArr(options, (option) => option.numPerms);
};

export const day12 = (input: string[]) => {
  const records = parseRecords(input);
  return sumArr(records, getNumValidPerms);
};

export const day12part2 = (input: string[]) => {
  const records = parseRecords(input);
  const extendedRecords = extendRecords(records);
  const num = 5;
  console.log(extendedRecords[num].springs.join(''), extendedRecords[num].groups);
  console.log(getBigNumPerms(extendedRecords[num]));
  // console.log(getNumValidPerms(extendedRecords[1]));
  // return sumArr(records, getNumValidPerms);
};
