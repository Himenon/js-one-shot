import { memorize } from '../memorize';

test('memorize', () => {
  function add(a: number, b: number) {
    return a + b;
  }
  const customAdd = memorize(add);
  expect(customAdd(1, 2)).toEqual(3);
  expect(customAdd(1, 2)).toEqual(3);
});
