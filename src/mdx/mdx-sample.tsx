// @ts-ignore
import * as objectRestSpread from '@babel/plugin-proposal-object-rest-spread';
// @ts-ignore
import * as transformJSX from '@babel/plugin-transform-react-jsx';
// @ts-ignore
import * as babelStandAlone from '@babel/standalone';
import * as mdx from '@mdx-js/mdx';
import { MDXTag } from '@mdx-js/tag';
import * as React from 'react';

process.on('unhandledRejection', console.dir);

const parse2 = (raw: string): string | null =>
  babelStandAlone.transform(raw, {
    plugins: [transformJSX, objectRestSpread],
  }).code;

export const converter = async (content: string) => {
  return await mdx.sync(content, {
    skipExport: true,
  });
};

export const mdxToHtml = async (content: string) => {
  const tmp1 = await converter(content);
  const code = parse2(tmp1);
  const scope = {};
  const components = {};
  const props = {};

  const fullScope = {
    MDXTag,
    components,
    props,
    ...scope,
  };
  const keys = Object.keys(fullScope);
  const values = keys.map(key => fullScope[key]);
  const fn = new Function('React', ...keys, `return ${code}`);
  const resultComponent = fn(React, ...values);
  return resultComponent;
};
