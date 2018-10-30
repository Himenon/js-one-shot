const toH = require('hast-to-hyperscript');
import * as h from 'hyperscript';
import * as React from 'react';
const tree = {
  type: 'element',
  tagName: 'p',
  properties: { id: 'alpha', className: ['bravo'] },
  children: [
    { type: 'text', value: 'charlie ' },
    {
      type: 'element',
      tagName: 'strong',
      properties: { style: 'color: red' },
      children: [{ type: 'text', value: 'delta' }],
    },
    { type: 'text', value: ' echo.' },
  ],
};

export const main = () => {
  return toH(h, tree).outerHTML;
};

const hashTree = { type: 'element', tagName: 'div', properties: {}, children: [] };

export const customH = (name: string, props: any, children: any) => {
  return React.createElement(name, props, children);
};

export const mainReact = () => {
  return toH(React.createElement, hashTree).outerHTML;
};
