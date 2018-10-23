import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as renderer from 'react-test-renderer';
import * as OneShot from '../customMark';

test('React.MyComponent', () => {
  const comp = React.createElement(OneShot.App, { title: '' });
  expect(comp).toEqual(<OneShot.App title="" />);
});

test('MarkdownからHTMLがレンダリングされていることを確認する', () => {
  const component = renderer.create(<OneShot.App title="# Hello world" />);
  const componentJSON = component.toJSON()!;
  expect(componentJSON).not.toBeNull();
  expect(componentJSON.props.dangerouslySetInnerHTML).not.toBeUndefined();
  expect(componentJSON.props.dangerouslySetInnerHTML.__html).not.toBeUndefined();
  const html = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(html).toBe(`<h2>Hello world</h2>
`);
});

test('React.renderToStaticMarkup', () => {
  const component = ReactDOMServer.renderToStaticMarkup(<OneShot.App title="# Hello world" />);
  expect(component).toBe(`<div><h2>Hello world</h2>
</div>`);
});
