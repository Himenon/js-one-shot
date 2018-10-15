import * as React from 'react';
import * as OneShot from '../oneshot';


test('React.MyComponent', () => {
  const comp = React.createElement(OneShot.App);
  expect(comp).toEqual(<OneShot.App />);
});

