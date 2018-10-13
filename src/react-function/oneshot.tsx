import * as React from 'react';

export interface MyComponentProps {
  text: string;
}

export class MyComponent extends React.Component<MyComponentProps, {}> {
  public render() {
    return <div>${this.props.text}</div>;
  }
}

export function createComponent() {
  return new Function('React', 'MyComponent', `return props => ${MyComponent}`);
}