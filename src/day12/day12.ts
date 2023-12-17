import { maxArr, sumArr } from '../utils/array';
import { range } from '../utils/looping';

export enum Spring {
  OPERATIONAL = '.',
  DAMAGED = '#',
  UNKNOWN = '?',
}
type SRecord = { springs: Spring[]; groups: number[] };
type Option = { index: number; numPerms: number };

export const parseRecords = (input: string[]): SRecord[] =>
  input.map((line) => {
    const [springs, groups] = line.split(' ');
    return { springs: [...springs] as Spring[], groups: groups.split(',').map(Number) };
  });

const printRecord = (record: SRecord, info?: string) => {
  // return;
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

export const getIsValidRecord = (record: SRecord): boolean => {
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

export const getIsValidStartRecord = (record: SRecord, numToCheck: number): boolean => {
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

export const getFirstGroupSize = (record: SRecord): number => {
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

export const getGroupSizePossible = (record: SRecord, num: number): number => {
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

export const getNumValidPerms = (record: SRecord): number => {
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

export const getBigNumPermOptions = (record: SRecord, numGroups: number): Option[] => {
  // console.log('getBigNumPermOptions', record, numGroups);
  const { springs, groups } = record;
  // console.log(springs.join(''));

  const options: Option[] = [];
  let length = 1;

  const requiredSizeLeft = sumArr(record.groups.slice(numGroups), (group) => group + 1) - 1;
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

export const getBigNumPerms = (record: SRecord) => {
  const { springs, groups } = record;

  let options: Option[] = [{ index: 0, numPerms: 1, groups: 0 }];
  for (let g = 0; g < groups.length; g++) {
    // console.log(' in g loop', options);

    let numGroups = 1;
    while (groups[g + numGroups - 1] >= groups[g + numGroups]) numGroups++;
    // console.log({ numGroups });
    // if (groups[g] === 2 && groups[g + 1] === 1) numGroups = 2;

    // console.log({ numGroups });

    const newOptions: Option[] = [];
    const shortGroups = groups.slice(g);
    options.forEach((option) => {
      const shortSprings = springs.slice(option.index);
      // console.log(
      //   'about to call getBigNumPermOptions for',
      //   option,
      //   'with',
      //   shortSprings,
      //   shortGroups,
      //   numGroups,
      // );
      const shortOptions = getBigNumPermOptions(
        { springs: shortSprings, groups: shortGroups },
        numGroups,
      );
      // console.log('in option loop', {
      //   g,
      //   shortOptions,
      //   shortSprings: shortSprings.join('').slice(0, 10),
      // });
      shortOptions.forEach((shortOption) => {
        newOptions.push({
          index: option.index + shortOption.index,
          numPerms: option.numPerms * shortOption.numPerms,
          groups: g + 1,
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
    g += numGroups - 1;
    // options = newOptions;
  }
  // console.log({ options });
  return maxArr(options, (option) => option.numPerms);
  // return sumArr(options, (option) => option.numPerms);
};

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

export const getRecNumPerms = (record: SRecord, memo: Record<string, number> = {}): number => {
  const memoKey = getMemoKey(record);
  if (memo[memoKey]) return memo[memoKey];

  const { groups: currentGroups, end } = getCurrentGroups(record.springs);
  const isStartValid = currentGroups.every((group, i) => group === record.groups[i]);
  if (!isStartValid) {
    memo[memoKey] = 0;
    return 0;
  }
  if (currentGroups.length === record.groups.length && !record.springs.includes(Spring.UNKNOWN)) {
    memo[memoKey] = 1;
    return 1;
  }

  if (record.springs.length < sumArr(record.groups, (i) => i) + record.groups.length - 1) {
    memo[memoKey] = 0;
    return 0;
  }

  ///////
  const numDamage = record.springs.filter((i) => i === Spring.DAMAGED).length;
  const numOp = record.springs.filter((i) => i === Spring.OPERATIONAL).length;
  const numUnknown = record.springs.filter((i) => i === Spring.UNKNOWN).length;
  const reqDamage = sumArr(record.groups, (i) => i);
  const reqOp = record.groups.length - 1;
  if (reqDamage > numDamage + numUnknown || reqOp > numOp + numUnknown) {
    // console.log('extra hit');
    // console.log({ numDamage, numOp, numUnknown, reqDamage, reqOp });
    memo[memoKey] = 0;
    return 0;
  }

  ///////

  const remainingGroups = record.groups.slice(currentGroups.length);
  const nextUnknown = record.springs.findIndex((spring) => spring === Spring.UNKNOWN);
  if (nextUnknown === -1) {
    memo[memoKey] = 0;
    return 0;
  }

  const damageOption = [...record.springs];
  damageOption[nextUnknown] = Spring.DAMAGED;
  const damageRecord = { springs: damageOption.slice(end), groups: remainingGroups };
  // printRecord(damageRecord, 'damageRecord');
  const damagedPerms = getRecNumPerms(damageRecord, memo);

  const operationalOption = [...record.springs];
  operationalOption[nextUnknown] = Spring.OPERATIONAL;
  const operationalRecord = { springs: operationalOption.slice(end), groups: remainingGroups };
  // printRecord(operationalRecord, 'operationalRecord');
  const operationalPerms = getRecNumPerms(operationalRecord, memo);

  memo[memoKey] = damagedPerms + operationalPerms;
  return damagedPerms + operationalPerms;
};

export const day12 = (input: string[]) => {
  const records = parseRecords(input);
  return sumArr(records, (i) => getRecNumPerms(i, {}));
};

export const day12part2 = (input: string[]) => {
  const records = parseRecords(input);
  const extendedRecords = extendRecords(records);

  let sum = 0;
  let start = extendedRecords.length > 10 ? 161 : 0;
  for (let i = start; i < extendedRecords.length; i++) {
    if (i > 28) printRecord(extendedRecords[i]);
    const ans = getRecNumPerms(extendedRecords[i], {});
    sum += ans;
    console.log(i, ans);
  }
  return sum;
  // const num = 5;
  // // console.log(extendedRecords[num].springs.join(''), extendedRecords[num].groups);
  // // console.log(getBigNumPerms(extendedRecords[num]));
  // // console.log(getNumValidPerms(extendedRecords[1]));
  // return sumArr(extendedRecords, (i) => {
  //   // console.log(i.springs.join(''), i.groups);
  //   const ans = getRecNumPerms(i, {});
  //   console.log(ans);
  //   return ans;
  // });
};

// .??..??...?##.?.??..??...?##.?.??..??...?##.?.??..??...?##.?.??..??...?##.
