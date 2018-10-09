// @ts-ignore
import * as transformJSX from '@babel/plugin-transform-react-jsx';
// @ts-ignore
import * as babel from '@babel/standalone';
import * as React from 'react';

const parse = (raw: string): string | null =>
  babel.transform(raw, {
    plugins: [transformJSX],
  }).code;

const wrap = (jsx: string) => `<React.Fragment>${jsx}</React.Fragment>`;

export const toComponent = (jsx: string) => {
  const el = parse(wrap(jsx));
  const keys = Object.keys(scope);
  const values = keys.map((key) => scope[key]);
  const createFunction = new Function('React', ...keys, `return props => ${el}`);
  const Comp = createFunction(React, ...values);
  return Comp;
};
