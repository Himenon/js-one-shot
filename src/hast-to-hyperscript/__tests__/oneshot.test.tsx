import * as React from 'react';
import * as OneShot from '../oneshot';

describe('hast-to-hyperscript', () => {
  test('sample test with hyperscript', () => {
    const doc = OneShot.main();
    expect(doc).toBe('<p id="alpha" class="bravo">charlie <strong style="color:red;">delta</strong> echo.</p>');
  });

  test('sample test with React.createElement', () => {
    const doc = OneShot.mainReact();
    expect(doc).toBe(<div />);
  });
});
