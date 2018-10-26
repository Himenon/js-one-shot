import * as OneShot from '../oneshot';

describe('hast-to-hyperscript', () => {
  test('sample test', () => {
    const doc = OneShot.main();
    expect(doc).toBe('<p id="alpha" class="bravo">charlie <strong style="color:red;">delta</strong> echo.</p>');
  })
})