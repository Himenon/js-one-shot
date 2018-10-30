const unified = require('unified');
const parse = require('remark-parse');
const markdown = require('remark-stringify');
const html = require('rehype-stringify');
const remark2rehype = require('remark-rehype');

export const main1 = (text: string) => {
  return unified()
    .use(parse)
    .use(remark2rehype)
    .use(html)
    .processSync(text)
    .toString();
};

export const main2 = (text: string) => {
  return unified()
    .use(parse)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(html, { allowDangerousHTML: true })
    .processSync(text)
    .toString();
};

export const main3 = (text: string) => {
  return unified()
    .use(parse)
    .use(remark2rehype, unified())
    .use(markdown)
    .processSync(text)
    .toString();
};

export const main4 = (text: string) => {
  return unified()
    .use(parse)
    .use(remark2rehype, unified(), { allowDangerousHTML: true })
    .use(markdown)
    .processSync(text)
    .toString();
};
