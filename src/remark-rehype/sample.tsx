// @ts-ignore
import doc from 'rehype-document';
// @ts-ignore
import parse2 from 'rehype-parse';
// @ts-ignore
import html from 'rehype-stringify';
// @ts-ignore
import * as remark from 'remark';
// @ts-ignore
import markdown from 'remark-parse';
// @ts-ignore
import parse from 'remark-parse';
// @ts-ignore
import remark2rehype from 'remark-rehype';
// @ts-ignore
import * as stringify from 'remark-stringify';
// @ts-ignore
import * as vfile from 'to-vfile';
// @ts-ignore
import * as unified from 'unified';

export const main = () => {
  // @ts-ignore
  return unified()
    .use(markdown)
    .use(parse2)
    .use(remark2rehype)
    .use(html)
    .processSync('## Hello, world! ##')
    .toString();
};
