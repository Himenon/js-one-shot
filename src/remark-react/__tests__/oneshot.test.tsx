import * as React from 'react';
import * as OneShot from '../oneshot';
import * as renderer from 'react-test-renderer';


test('React.MyComponent', () => {
  const comp = React.createElement(OneShot.App);
  expect(comp).toEqual(<OneShot.App />);
});

test('レンダリングを行った結果が一致する', () => {
  const component = renderer.create(
    <OneShot.App />
  );
  const tree = component.toJSON();
  expect(tree).toEqual(`# hello world
`);
})
