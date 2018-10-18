import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as OneShot from '../oneshot';


test('parse', () => {
  const codeString = OneShot.parse(`
  function hello() {
    return "Hello World";
  }
  `);
  expect(codeString).not.toBeNull();
  const hello = new Function(`return ${codeString}`)();
  expect(hello()).toEqual('Hello World');
})

test('parse string that contain JSX', () => {
  const codeString = OneShot.parseWithJSX('<div>Hello World</div>');
  expect(codeString).toEqual('React.createElement("div", null, "Hello World");');
  const componentCreator = new Function('React', `return ${codeString}`);

  const component = componentCreator(React);
  const testComponent = renderer.create(component);
  const expectComponent = renderer.create(<div>Hello World</div>);
  expect(testComponent.toJSON()).toEqual(expectComponent.toJSON());
});
