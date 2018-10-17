import * as React from "react";
// import * as ReactDOM from "react-dom";
import * as remark from "remark";
import reactRenderer from "remark-react";

export class App extends React.Component<{}, { text: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      text: "# hello world"
    };
  }
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ text: e.target.value });
  }
  render() {
    return (
      <div>
        <textarea value={this.state.text} onChange={this.onChange} />
        <div id="preview">
          {
            // @ts-ignore
            remark()
              .use(reactRenderer)
              .processSync(this.state.text).contents
          }
        </div>
      </div>
    );
  }
}
