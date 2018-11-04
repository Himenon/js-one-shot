import * as React from 'react';
import * as remark from 'remark';
import * as html from 'remark-html';
import { remarkReact } from './index';

export function convert(body: string) {
  return remark()
    .use(remarkReact, {
      sanitize: true,
      createElement: React.createElement,
      remarkReactComponents: {
        h1: (props: any) => React.createElement('h2', props),
      },
    })
    .use(html)
    .processSync(body).contents;
}

export class TestApp extends React.Component<{ body: string }, {}> {
  public render() {
    const content = {
      __html: convert(this.props.body),
    };
    return <div dangerouslySetInnerHTML={content} />;
  }
}

const main = () => {
  const component = convert('# Hello world');
  console.log(component);

  const component2 = convert('## Hello world');
  console.log(component2);
};

main();
