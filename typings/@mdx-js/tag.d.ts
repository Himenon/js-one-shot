import * as React from 'react';

export interface LayoutProps { children: React.ReactNode[], id: string }

export interface MDXTagProps {
  name: string;
  parentName?: string;
  props?: {};
  children?: React.ReactNode[] | string;
  components?: { [key: string]: <T>(props: T) => React.ReactElement<T> },
  Layout?: ( {children, id }: LayoutProps) => React.ReactNode[];
  layoutProps?: LayoutProps;
}

export declare class MDXTag extends React.Component<MDXTagProps, {}> {
  render(): JSX.Element;
}
