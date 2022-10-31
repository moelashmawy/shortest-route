const arraySum = (arr: number[]) =>
  arr.reduce((a: number, b: number) => a + b, 0);

const arrayToObject = (arr: string[]) =>
  arr.reduce((a, v) => ({ ...a, [v]: { label: v, value: v } }), {});

export { arraySum, arrayToObject };
