import * as React from 'react';
import * as remark from 'remark';
import * as html from 'remark-html';
// @ts-ignore
import markdown from 'remark-parse';
import remarkReact from 'remark-react';
import { remarkReactComponents } from './options';

export interface AppProps {
  contents: string;
}

// @ts-ignore
const processor = remark().use(remarkReact, {
  prefix: 'md-',
  sanitize: true,
});

export class App extends React.Component<AppProps, {}> {
  public render() {
    // @ts-ignore
    const remarkProcess = remark()
      .use(remarkReact, {
        remarkReactComponents,
      })
      .use(markdown, {
        commonmark: true,
        breaks: false,
      })
      .use(html);
    const contents = {
      __html: remarkProcess.processSync(this.props.contents).contents,
    };
    return <div dangerouslySetInnerHTML={contents} />;
  }
}
