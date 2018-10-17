import * as React from "react";
import * as remark from "remark";
import reactRenderer from "remark-react";

export interface AppState {
  text: string;
}

// @ts-ignore
const processor = remark().use(reactRenderer, {
  prefix: 'md-',
  sanitize: true
})

export class App extends React.Component<{}, AppState> {
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
    // @ts-ignore
    const content = processor.processSync(this.state.text).contents
    return content;
  }
}

