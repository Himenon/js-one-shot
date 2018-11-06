import { MDXTag } from '@mdx-js/tag';
import * as React from 'react';

const H2 = (props: any) => <h2 style={{ color: 'tomato' }} {...props} />;

export const makeComponent = (tag: keyof JSX.IntrinsicElements, body: string) => {
  return (
    <MDXTag
      name={tag}
      components={{
        h1: H2,
      }}
      children={body}
    />
  );
};
