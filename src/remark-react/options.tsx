import * as React from 'react';

export const remarkReactComponents = {
  h1: (props: any): React.ReactNode => {
    return React.createElement(
      'p',
      props,
      React.createElement(
        'a',
        {
          href: '#',
          style: {
            color: 'inherit',
            textDecoration: 'none',
          },
        },
        props.children,
      ),
    );
  },
  h2: (props: any): React.ReactNode => {
    return React.createElement(
      'a',
      props,
      React.createElement(
        'a',
        {
          href: '#',
          style: {
            color: 'inherit',
            textDecoration: 'none',
          },
        },
        props.children,
      ),
    );
  },
};
