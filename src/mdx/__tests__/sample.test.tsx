import * as ReactDOM from 'react-dom/server';
import { makeComponent } from '../sample';

test('renderToStaticMarkup2', () => {
  const component = makeComponent('h1', 'hoge');
  const result = ReactDOM.renderToStaticMarkup(component);
  expect(result).toEqual('<h2 style="color:tomato">hoge</h2>');
});
