const ensureMinArrayLength = <T>(
  array: T[],
  minLength: number,
  fillValue: T,
): T[] => {
  if (array.length < minLength) {
    const elementsToAdd = minLength - array.length;
    array = array.concat(new Array<T>(elementsToAdd).fill(fillValue));
  }
  return array;
};

export default ensureMinArrayLength;
