import * as React from 'react';
import * as remark from 'remark';
import * as html from 'remark-html';
import reactRenderer from 'remark-react';

export class App extends React.Component<{}, { text: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      text: '# hello world',
    };
    this.onChange = this.onChange.bind(this);
  }

  public onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ text: e.target.value });
  }

  public render() {
    const markUp = {
      // @ts-ignore
      __html: remark()
        .use(reactRenderer, {
          sanitize: false,
        })
        .use(html)
        .processSync(this.state.text).contents,
    };
    return (
      <div>
        <textarea value={this.state.text} onChange={this.onChange} />
        <div id="preview" dangerouslySetInnerHTML={markUp} />
      </div>
    );
  }
}
