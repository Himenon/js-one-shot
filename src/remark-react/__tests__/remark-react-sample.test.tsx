import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as renderer from 'react-test-renderer';
import * as OneShot from '../customMark';

test('初期化できることを確認する', () => {
  const comp = React.createElement(OneShot.App, { contents: '' });
  expect(comp).toEqual(<OneShot.App contents="" />);
});

test('MarkdownからHTMLがレンダリングされていることを確認する', () => {
  const component = renderer.create(<OneShot.App contents="# Hello world" />);
  const componentJSON = component.toJSON()!;
  expect(componentJSON).not.toBeNull();
  expect(componentJSON.props.dangerouslySetInnerHTML).not.toBeUndefined();
  expect(componentJSON.props.dangerouslySetInnerHTML.__html).not.toBeUndefined();
  const html = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(html).toBe(`<h1>Hello world</h1>
`);
});

test('React.renderToStaticMarkupで結果を確認する', () => {
  const component = ReactDOMServer.renderToStaticMarkup(<OneShot.App contents="# Hello world" />);
  expect(component).toBe(`<div><h1>Hello world</h1>
</div>`);
});
