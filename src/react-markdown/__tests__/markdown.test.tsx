import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as renderer from 'react-test-renderer';
import { Heading1, Heading1Props } from '../heading1';
import { defaultProps, Markdown, MarkdownProps } from '../markdown';

describe('MarkdownComponent', () => {
  test('defaultProps', () => {
    const component = defaultProps.scope.Title!({
      title: 'hoge',
    });
    const result = renderer.create(component);
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({ type: 'h1', props: {}, children: ['hoge'] });
  });

  test('Heading1', () => {
    const result = renderer.create(<Heading1 title="sample text" />);
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({ type: 'h1', props: {}, children: ['sample text'] });
  });

  test('props.textを設定しない', () => {
    const props: MarkdownProps = {
      h1: {},
      scope: { Title: (props1: Heading1Props) => <Heading1 {...props1} /> },
    };
    const result = ReactDOM.renderToStaticMarkup(<Markdown {...props} />);
    expect(result).toEqual('<div></div>');
  });

  test('Rendering Value', () => {
    const props: MarkdownProps = {
      text: '<h1>Hello React Markdown</h1>',
      h1: {},
      scope: { Title: (props1: Heading1Props) => <Heading1 {...props1} /> },
    };
    const result = ReactDOM.renderToStaticMarkup(<Markdown {...props} />);
    expect(result).not.toEqual('<div><h1>Hello React Markdown</h1></div>');
  });

  test('Rendering Value no scope', () => {
    const props: MarkdownProps = {
      text: '<h1>Hello Gen</h1>',
      h1: {},
      scope: {},
    };
    const result = renderer.create(<Markdown {...props} />);
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({ type: 'div', props: {}, children: null });
  });
});
