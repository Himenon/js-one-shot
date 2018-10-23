import * as React from 'react';
import * as remark from 'remark';
import * as html from 'remark-html';
import remarkReact from 'remark-react';

export interface AppProps {
  title: string;
}

// @ts-ignore
const processor = remark().use(remarkReact, {
  prefix: 'md-',
  sanitize: true,
});

export class App extends React.Component<AppProps, {}> {
  public render() {
    const content = {
      // @ts-ignore
      __html: remark()
        .use(remarkReact, {
          sanitize: false,
        })
        .use(html)
        .processSync(this.props.title).contents,
    };
    return <div dangerouslySetInnerHTML={content} />;
  }
}
