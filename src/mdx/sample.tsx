import { MDXTag } from '@mdx-js/tag';
import * as React from 'react';

const MyH1 = (props: any) => <h2 style={{ color: 'tomato' }} {...props} />;

export const makeComponent = (body: string) => {
  return (
    <MDXTag
      name="h1"
      components={{
        h1: MyH1,
      }}
      children={body}
    />
  );
};
