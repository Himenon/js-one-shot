import * as renderer from 'react-test-renderer';
import * as OneShot from '../oneshot';

describe('hast-to-hyperscript', () => {
  test('sample test with hyperscript', () => {
    const doc = OneShot.main();
    expect(doc).toBe('<p id="alpha" class="bravo">charlie <strong style="color:red;">delta</strong> echo.</p>');
  });

  test('sample test with React.createElement', () => {
    const doc = OneShot.mainReact();
    expect(doc).toBeUndefined();
  });

  test('customH', () => {
    const result = renderer.create(OneShot.customH('div', {}, null));
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({ type: 'div', props: {}, children: null });
  });
});
