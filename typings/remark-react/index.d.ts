import * as React from 'react';

export interface Options {
  createElement?: Function
  sanitize?: boolean
  toHast?: {}
  remarkReactComponents?: {}
}

declare function remarkReact(options: Options): any;

export default remarkReact;
