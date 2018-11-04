import * as React from 'react';
import * as remark from 'remark';
// @ts-ignore
import * as remarkReact from 'remark-react';
// @ts-ignore
import * as remarkSlug from 'remark-slug';

import { heading, Heading1, Heading1Props } from './heading1';

export interface ScopedComponents {
  Title?: (props: Heading1Props) => React.ReactElement<Heading1Props>;
}

export interface MarkdownProps {
  text?: string;
  h1: { [key: string]: number };
  scope: ScopedComponents;
}

export interface MappedScope {
  h1: React.ReactNode | undefined;
}

export const defaultProps: MarkdownProps = {
  h1: {},
  scope: {
    Title: (props: Heading1Props) => <Heading1 {...props} />,
  },
};

export class Markdown extends React.Component<MarkdownProps, {}> {
  public render() {
    const scope = this.props.scope;

    const mappedScope = this.mapScope({ ...scope });
    const remarkReactComponents = this.applyProps(mappedScope);

    const opts = {
      remarkReactComponents, // 上書きする
    };
    const element = remark()
      .use(remarkSlug)
      .use(remarkReact, opts)
      .processSync(this.props.text || '').contents;

    return element;
  }

  private mapScope = (scope: ScopedComponents): MappedScope => {
    const h1 = scope.Title;
    return {
      h1: h1 ? heading(h1) : undefined,
    };
  };

  private applyProps = (scope: MappedScope) => {
    const props = { ...defaultProps };
    Object.keys(props).forEach(key => {
      if (!scope[key]) {
        return;
      }
      scope[key].defaultProps = { ...scope[key].defaultProps, ...props[key] };
    });
    return scope;
  };
}
