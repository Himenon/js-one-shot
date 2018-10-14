// @ts-ignore
import * as standalone from "@babel/standalone";
// @ts-ignore
import * as transformJSX from '@babel/plugin-transform-react-jsx'

export const parse = (raw: string): string | null => {
  return standalone.transform(raw, {}).code;
}

export const parseWithJSX = (raw: string): string | null => {
  return standalone.transform(raw, {
    plugins: [transformJSX],
  }).code;
}
