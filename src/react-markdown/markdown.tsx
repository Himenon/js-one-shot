import * as React from 'react'
// @ts-ignore
import * as remark from 'remark'
// @ts-ignore
import * as remarkReact from 'remark-react'
// @ts-ignore
import * as remarkSlug from 'remark-slug'

import { Heading1, Heading1Props } from './heading1';

export interface ScopedComponents {
  Title: () => React.Node
}


export interface MarkdownProps {
  h1: { [key: string]: number }
  scope: ScopedComponents
}

export interface MappedScope {
  h1: React.ReactNode | undefined;
}

export interface HeadingProps {
  id: string
  children?: React.ReactNode[]
}

const defaultProps: MarkdownProps = {
  h1: {
    mb: 3,
    mt: 4,
  },
  scope: {
    Title: (props: Heading1Props) => <Heading1 {...props} />
  }
}

const heading = (Comp: any) => (props: HeadingProps): React.ReactNode => {
  return React.createElement(
    Comp,
    props,
    React.createElement(
      'a',
      {
        href: '#' + props.id,
        style: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
      props.children,
    ),
  )
}

export class Markdown extends React.Component<MarkdownProps, {}> {
  public render() {
    const scope = this.props.scope;

    const mappedScope = this.mapScope({ ...scope })
    const remarkReactComponents = this.applyProps(mappedScope)

    const opts = {
      // pass Lab components to remark-react for rendering
      remarkReactComponents,
    }
    // @ts-ignore
    const element = remark()
      .use(remarkSlug)
      .use(remarkReact, opts)
      .processSync(text).contents

    return element
  }

  private mapScope = (scope: ScopedComponents): MappedScope => {
    const h1 = scope.Title
    return {
      h1: h1 ? heading(h1) : undefined,
    }
  }

  private applyProps = (scope: MappedScope) => {
    const props = { ...defaultProps, ...options.markdownProps }
    Object.keys(props).forEach(key => {
      if (!scope[key]) {
        return
      }
      scope[key].defaultProps = { ...scope[key].defaultProps, ...props[key] }
    })
    return scope
  }
}
