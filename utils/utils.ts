export const getRandomFromArray: <T>(array: T[]) => T = (array) =>
  array[getRandomIndex(array)];

export const getRandomIndex: <T>(array: T[]) => number = (array) =>
  Math.floor(Math.random() * array.length);

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const uniqueFilter: <T>(
  element: T,
  index: number,
  array: T[]
) => boolean = (element, index, array) => index === array.indexOf(element);

export const ensureUnique = <T>(array: T[]) => array.filter(uniqueFilter);
