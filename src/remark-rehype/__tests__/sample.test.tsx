import * as React from 'react';
import * as Sample from '../sample';

test('Sampleのテスト', () => {
  const result = Sample.main();
  console.log(result);
  expect(result).toBe(<div />);
});
