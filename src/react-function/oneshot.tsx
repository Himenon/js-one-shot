import * as React from 'react';

export interface HogeProps {
  text: string;
}

export interface FooProps {
  name: string;
}

export class HogeComponent extends React.Component<HogeProps, {}> {
  public render() {
    return <div>${this.props.text}</div>;
  }
}

export class FooComponent extends React.Component<FooProps, {}> {
  public render() {
    return <div>${this.props.name}{this.props.children}</div>;
  }
}

/**
 * StringからReactComponentを作成する
 */
export function getHogeCreatorSeed() {
  const args = ['MyComponent'];
  const func = 'React.createElement(MyComponent, { text: "hoge" }, null)';
  const create = new Function('React', ...args, `return props => ${func}`);
  return create;
}

/**
 * getHogeCreatorSeed の簡略版
 */
export function getHogeCreator() {
  const args = ['MyComponent'];
  const func = 'React.createElement(MyComponent, { text: "hoge" }, null)';
  const create = new Function('React', ...args, `return props => ${func}`);
  return create(React, HogeComponent);
}

/**
 * 階層構造のあるコンポーネントのファクトリーの作成
 */
export function getNestComponentCreator() {
  const args = ['FooComponent', 'HogeComponent'];
  const func = `React.createElement(FooComponent, { name: "foooo" }, React.createElement(HogeComponent, { text: "hoge" }, null))`;
  const create = new Function('React', ...args, `return props => ${func}`);
  return create(React, FooComponent, HogeComponent);
}

/**
 * 引数を取得するような生成パターン
 */
export function getNestComponentCreator2(props1: FooProps, props2: HogeProps) {
  const args = ['FooComponent', 'HogeComponent'];
  const func = `React.createElement(FooComponent, ${JSON.stringify(props1)}, React.createElement(HogeComponent, ${JSON.stringify(props2)}, null))`;
  const create = new Function('React', ...args, `return props => ${func}`);
  return create(React, FooComponent, HogeComponent);
}
