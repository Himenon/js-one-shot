export const sum = new Function('a', 'b', 'return a + b;');

export const argFunction = new Function('a', 'return a + x;');

export const simpleReturnFunction = () => {
  return new Function('return y;');
};
