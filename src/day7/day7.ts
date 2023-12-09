type Round = { hand: string; bid: number };

const parseRounds = (input: string[]): Round[] =>
  input.map((line) => {
    const [hand, bid] = line.split(' ');
    return { hand, bid: +bid };
  });

const getCardValue = (card: string, isJoker?: boolean) => {
  const J = isJoker ? 1 : 11;
  const ranks: Record<string, number> = { A: 14, K: 13, Q: 12, J, T: 10 };
  return ranks[card] || +card;
};

const getHandRank = (hand: string, isJoker?: boolean) => {
  const groups = [...hand].reduce((acc: Record<string, number>, card) => {
    if (acc[card]) return { ...acc, [card]: acc[card] + 1 };
    return { ...acc, [card]: 1 };
  }, {});

  const { J, ...others } = groups;
  const counts = Object.values(isJoker ? others : groups).sort((a, b) => b - a);
  const numJs = isJoker ? J || 0 : 0;

  if (counts[0] + numJs === 5 || numJs === 5) return 7;
  if (counts[0] + numJs === 4) return 6;
  if (counts.length <= 2) return 5;
  if (counts[0] + numJs === 3) return 4;
  if (counts[0] === 2 && counts[1] + numJs === 2) return 3;
  if (counts[0] + numJs === 2) return 2;
  return 1;
};

const doesHandABeatHandB = (
  handA: string,
  handB: string,
  isJoker?: boolean,
): boolean => {
  const handRankA = getHandRank(handA, isJoker);
  const handRankB = getHandRank(handB, isJoker);
  if (handRankA > handRankB) return true;
  if (handRankB > handRankA) return false;

  const firstDiffIndex = [...handA].findIndex((_, i) => handA[i] !== handB[i]);
  return (
    getCardValue(handA[firstDiffIndex], isJoker) >
    getCardValue(handB[firstDiffIndex], isJoker)
  );
};

const sortRounds = (rounds: Round[], isJoker?: boolean): Round[] =>
  [...rounds].sort((roundA, roundB) =>
    doesHandABeatHandB(roundA.hand, roundB.hand, isJoker) ? 1 : -1,
  );

const getWinnings = (rounds: Round[], isJoker?: boolean) => {
  const sortedRounds = sortRounds(rounds, isJoker);
  return sortedRounds.reduce(
    (sum, round, index) => sum + round.bid * (index + 1),
    0,
  );
};

export const day7 = (input: string[]) => {
  const rounds = parseRounds(input);
  return getWinnings(rounds);
};

export const day7part2 = (input: string[]) => {
  const rounds = parseRounds(input);
  return getWinnings(rounds, true);
};
