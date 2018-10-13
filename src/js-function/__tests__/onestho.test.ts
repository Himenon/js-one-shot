import * as OneShot from '../oneshot';

test('sum function', () => {
  expect(OneShot.sum(1, 2)).toEqual(3);
  expect(OneShot.sum(2, 2)).toEqual(4);
  expect(OneShot.sum(-1, -6)).toEqual(-7);
  expect(OneShot.sum(-5, 5)).toEqual(0);
});

test('引数を1つだけ受け取る関数', () => {
  // @ts-ignore
  global.x = 10;
  expect(OneShot.argFunction(0)).toEqual(10);
});

test('globalな値をそのまま返す関数', () => {
  // @ts-ignore
  global.y = 10;
  expect(OneShot.simpleReturnFunction()()).toEqual(10);
});
