import * as renderer from 'react-test-renderer';
import { heading } from '../heading1';

test('heading', () => {
  const makeComponent = heading('div');
  const component = makeComponent({
    title: 'Hello world',
    children: null,
  });
  const result = renderer.create(component);
  const jsonValue = result.toJSON();
  expect(jsonValue).toEqual({
    type: 'div',
    props: { title: 'Hello world' },
    children: [{ type: 'a', props: { href: '#hoge', style: { color: 'inherit', textDecoration: 'none' } }, children: null }],
  });
});
