// @ts-ignore
import * as standalone from "@babel/standalone";

export const parse = (raw: string): string | null => {
  return standalone.transform(raw, {}).code;
}
