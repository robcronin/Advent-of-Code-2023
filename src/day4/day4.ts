import { countArr, sumArr } from '../utils/array';
import { parseInput } from '../utils/input';
import { range } from '../utils/looping';

type Card = {
  id: number;
  winningNumbers: number[];
  myNumbers: number[];
};

const parseCards = (input: string[]): Card[] =>
  input.map((line) => {
    const [card, numbers] = line.split(': ');
    const id = +card.split(' ')[1];
    const [winningString, myString] = numbers.split(' | ');
    const winningNumbers = parseInput(winningString) as number[];
    const myNumbers = myString.match(/\d+/g)?.map(Number) as number[];
    return { id, winningNumbers, myNumbers };
  });

const getNumMatches = (card: Card) =>
  countArr(card.winningNumbers, (num) => card.myNumbers.includes(num));

const getCardPoints = (card: Card) => {
  const numMatches = getNumMatches(card);
  return numMatches ? 2 ** (numMatches - 1) : 0;
};

const getEndNumAllCards = (cards: Card[]) => {
  const numAllCards: number[] = cards.map(() => 1);

  cards.forEach((card, cardIndex) => {
    const numCards = numAllCards[cardIndex];
    const numMatches = getNumMatches(card);

    range(cardIndex + 1, cardIndex + numMatches + 1).forEach(
      (copyIndex) => (numAllCards[copyIndex] += numCards),
    );
  });
  return numAllCards;
};

export const day4 = (input: string[]) => {
  const cards = parseCards(input);
  return sumArr(cards, getCardPoints);
};

export const day4part2 = (input: string[]) => {
  const cards = parseCards(input);
  const numAllCards = getEndNumAllCards(cards);

  return sumArr(numAllCards, (i) => i);
};
