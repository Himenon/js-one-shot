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
import remark2rehype from 'remark-rehype';
// @ts-ignore
import * as unified from 'unified';

// @ts-ignore
const processor = remark().use(markdown, {
  commonmark: true,
  breaks: false,
});

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
