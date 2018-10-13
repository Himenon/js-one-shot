import * as OneShot from '../oneshot';

test.skip('StringからFunctionを生成する', () => {
  const maker = OneShot.createComponent();
  expect(maker()).toEqual(OneShot.MyComponent);
});
