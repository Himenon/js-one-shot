import * as React from 'react';

export interface BasicProps {
  children?: React.ReactElement<any> | string | any;
}

export const remarkReactComponents = {
  h1: (props: BasicProps): React.ReactElement<any> => {
    return React.createElement('h2', props, props.children);
  },
  h2: (props: BasicProps): React.ReactElement<any> => {
    return React.createElement('h1', props, props.children);
  },
};
