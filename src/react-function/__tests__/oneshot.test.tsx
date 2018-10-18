import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as OneShot from '../oneshot';

test('React.MyComponent', () => {
  const comp = React.createElement(OneShot.HogeComponent, { text: 'hoge' });
  expect(comp).toEqual(<OneShot.HogeComponent text='hoge' />);
});

test('HogeCreatorSeedのテスト', () => {
  const hogeCreatorSeed = OneShot.getHogeCreatorSeed();
  const keys = [OneShot.HogeComponent];
  const receiveComponent = hogeCreatorSeed(React, ...keys)();
  const expectComponent = <OneShot.HogeComponent text='hoge' />;
  const myComponent1 = renderer.create(receiveComponent);
  const myComponent2 = renderer.create(expectComponent);
  expect(myComponent1.toJSON()).toEqual(myComponent2.toJSON());
});

test('HogeCreatorのテスト', () => {
  const hogeCreator = OneShot.getHogeCreator();
  const receiveComponent = hogeCreator();
  const expectComponent = <OneShot.HogeComponent text='hoge' />;
  const myComponent1 = renderer.create(receiveComponent);
  const myComponent2 = renderer.create(expectComponent);
  expect(myComponent1.toJSON()).toEqual(myComponent2.toJSON());
})


test('childrenを含むテスト', () => {
  const nextComponentCreator = OneShot.getNestComponentCreator();
  const receiveComponent = nextComponentCreator();
  const expectComponent = <OneShot.FooComponent name='foooo'><OneShot.HogeComponent text='hoge' /></OneShot.FooComponent>;
  const myComponent1 = renderer.create(receiveComponent);
  const myComponent2 = renderer.create(expectComponent);
  expect(myComponent1.toJSON()).toEqual(myComponent2.toJSON());
})

test('引数を取得するような生成パターン', () => {
  const nextComponentCreator = OneShot.getNestComponentCreator2({ name: 'foooo' }, { text: 'hoge' });
  const receiveComponent = nextComponentCreator();
  const expectComponent = <OneShot.FooComponent name='foooo'><OneShot.HogeComponent text='hoge' /></OneShot.FooComponent>;
  const myComponent1 = renderer.create(receiveComponent);
  const myComponent2 = renderer.create(expectComponent);
  expect(myComponent1.toJSON()).toEqual(myComponent2.toJSON());
})
