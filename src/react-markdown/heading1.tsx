import * as React from 'react';

export interface Heading1Props {
  title: string;
  children?: React.ReactNode;
}

export class Heading1 extends React.Component<Heading1Props, {}> {
  public render() {
    return <h1>{this.props.title}</h1>;
  }
}

export const heading = (Comp: any) => (props: Heading1Props): React.ReactElement<any> => {
  return React.createElement(
    Comp,
    props,
    React.createElement(
      'a',
      {
        href: '#hoge',
        style: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
      props.children,
    ),
  );
};
