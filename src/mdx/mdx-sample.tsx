const mdx = require('@mdx-js/mdx');

export const converter = async (content: string) => {
  return await mdx(content, {});
};
