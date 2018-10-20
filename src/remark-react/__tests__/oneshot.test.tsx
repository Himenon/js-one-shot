import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as OneShot from '../oneshot';


test('React.MyComponent', () => {
  const comp = React.createElement(OneShot.App, { title: '' });
  expect(comp).toEqual(<OneShot.App title='' />);
});

test('MarkdownからHTMLがレンダリングされていることを確認する', () => {
  const component = renderer.create(
    <OneShot.App title='# Hello world' />
  );
  const componentJSON = component.toJSON()!;
  expect(componentJSON).not.toBeNull();
  expect(componentJSON.props.dangerouslySetInnerHTML).not.toBeUndefined();
  expect(componentJSON.props.dangerouslySetInnerHTML.__html).not.toBeUndefined();
  const html = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(html).toBe(`<h1>Hello world</h1>
`);
})
