export function getIndex(arr: any[], index: number, change: 1 | -1, wrap = false): number {
  let newIndex = index + change;

  if (newIndex < 0 && !wrap) {
    newIndex = 0;
  } else if (newIndex < 0 && wrap) {
    newIndex = arr.length - 1;
  } else if (newIndex === arr.length && !wrap) {
    newIndex = arr.length - 1;
  } else if (newIndex === arr.length && wrap) {
    newIndex = 0;
  }

  return newIndex;
}

export function findIndex<T>(arr: T[], searchFn: (val: T) => void, defaultIndex?: number) {
  if (arr.length === 0) {
    return -1;
  }

  const result = arr.findIndex(searchFn);
  return result === -1 && defaultIndex !== undefined ? defaultIndex : result;
}

export function findIndexOrNull<T>(arr: T[], searchFn: (val: T) => void): number | null {
  const result = arr.findIndex(searchFn);
  return result >= 0 ? result : null;
}
