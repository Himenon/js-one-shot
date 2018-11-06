import { MDXTag } from '@mdx-js/tag';
import * as React from 'react';

const H2 = (props: JSX.IntrinsicElements['h2']) => <h2 style={{ color: 'tomato' }} {...props} />;

export const makeComponent = <T extends keyof JSX.IntrinsicElements>(tag: T, body: string, props?: JSX.IntrinsicElements[T]) => {
  return (
    <MDXTag
      name={tag}
      props={props}
      components={{
        h1: H2,
      }}
      children={body}
    />
  );
};
