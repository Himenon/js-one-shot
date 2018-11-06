import * as renderer from 'react-test-renderer';
import { makeComponent } from '../sample';

test('renderToStaticMarkup', () => {
  const component = makeComponent('hoge');
  console.log(component);
  const result = renderer.create(component);
  const jsonValue = result.toJSON();
  expect(jsonValue).toEqual('<h2>hoge\n</h2>');
});
