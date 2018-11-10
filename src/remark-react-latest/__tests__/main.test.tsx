import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as renderer from 'react-test-renderer';
import { convert, TestApp } from '../sample';

test('pluginを対象とした単体テスト', () => {
  const component = convert('# Hello world');
  expect(component).toEqual('<h1>Hello world</h1>\n');
});

test('Reactに組み込んだ場合のテスト', () => {
  const component = renderer.create(<TestApp body="# h1を書き換える" />);
  const componentJSON = component.toJSON()!;
  const result = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(result).toEqual('<h1>h1を書き換える</h1>\n');
});

test('renderToStaticMarkup', () => {
  const result = ReactDOMServer.renderToStaticMarkup(<TestApp body="# h1を書き換える" />);
  expect(result).toEqual('<div><h1>h1を書き換える</h1>\n</div>');
});
