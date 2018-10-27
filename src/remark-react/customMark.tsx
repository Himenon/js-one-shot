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

const remarkReactComponents = {
  h1(props: any) {
    return React.createElement('p', props, props.children);
  },
  h2(props: any) {
    return React.createElement('a', props, props.children);
  },
};

// @ts-ignore
const remarkProcess = remark()
  .use(remarkReact, {
    createElement: React.createElement,
    remarkReactComponents,
  })
  .use(html);

export class App extends React.Component<AppProps, {}> {
  public render() {
    const content = {
      __html: remarkProcess.processSync(this.props.title).contents,
    };
    return <div dangerouslySetInnerHTML={content} />;
  }
}
