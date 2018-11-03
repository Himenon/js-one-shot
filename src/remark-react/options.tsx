import * as React from 'react';

export interface BasicProps {
  children?: React.ReactElement<any> | string | any;
}

export interface AnchorProps extends BasicProps {
  href: string;
}

export const remarkReactComponents = {
  h1: (props: BasicProps): React.ReactElement<BasicProps> => {
    return React.createElement('h2', props, props.children);
  },
  h2: (props: BasicProps): React.ReactElement<BasicProps> => {
    return React.createElement('h1', props, props.children);
  },
  a: (props: AnchorProps): React.ReactElement<AnchorProps> => {
    return React.createElement('p', props, props.children);
  },
};
