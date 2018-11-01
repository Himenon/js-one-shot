// @ts-ignore
import * as transformJSX from '@babel/plugin-transform-react-jsx';
// @ts-ignore
import * as standalone from '@babel/standalone';

export const parse = (raw: string): string | null => {
  return standalone.transform(raw, {}).code;
};

export const parseWithJSX = (raw: string): string | null => {
  return standalone.transform(raw, {
    plugins: [transformJSX],
  }).code;
};
