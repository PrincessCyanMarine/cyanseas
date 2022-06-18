export const getRandomFromArray: <T>(array: T[]) => T = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const uniqueFilter: <T>(
  element: T,
  index: number,
  array: T[]
) => boolean = (element, index, array) => index === array.indexOf(element);

export const ensureUnique = <T>(array: T[]) => array.filter(uniqueFilter);
