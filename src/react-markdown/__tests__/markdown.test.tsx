import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Heading1, Heading1Props } from '../heading1';
import { Markdown, MarkdownProps } from '../markdown';

describe('MarkdownComponent', () => {
  test('Rendering Value', () => {
    const props: MarkdownProps = {
      text: 'Markdown',
      h1: {},
      scope: { Title: (props1: Heading1Props) => <Heading1 {...props1} /> },
    };
    const result = renderer.create(<Markdown {...props} />);
    expect(result).toBe('ha1');
  });
});
