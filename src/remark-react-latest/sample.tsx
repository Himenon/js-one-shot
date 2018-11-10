import * as React from 'react';
// import * as remark from 'remark';
import * as html from 'remark-html';
import { remarkReact } from './index';
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

// remarkと等価
const processor = unified()
  .use(parse)
  .use(stringify)
  .use(remarkReact, {
    sanitize: true,
    createElement: React.createElement,
    remarkReactComponents: {
      h1: (props: any) => React.createElement('h2', props),
    },
  });

processor.use(html);

export function convert(body: string) {
  return processor.processSync(body).contents;
}

export class TestApp extends React.Component<{ body: string }, {}> {
  public render() {
    const content = {
      __html: convert(this.props.body),
    };
    return <div dangerouslySetInnerHTML={content} />;
  }
}

export const main = () => {
  console.log('実行します');
  const component = convert('# Hello world');
  console.log(component);
  // const component2 = convert('## Hello world');
  // console.log(component2);
};

// main();
