const toHAST = require('mdast-util-to-hast');
const toSanitize = require('hast-util-sanitize');
const toH = require('hast-to-hyperscript');
const tableCellStyle = require('@mapbox/hast-util-table-cell-style');
import * as React from 'react';

const own = {}.hasOwnProperty;

const TABLE_ELEMENTS = ['table', 'thead', 'tbody', 'tfoot', 'tr'];

export interface Options {
  prefix?: string;
  processor?: any;
  sanitize?: boolean;
  createElement: typeof React.createElement;
  toHast?: typeof toHAST;
  remarkReactComponents?: { [key: string]: <T>(props: T) => React.ReactElement<T> };
}

/**
 * Attach a react compiler.
 *
 * @param {Unified} processor - Instance.
 * @param {Object?} [options]
 * @param {Object?} [options.sanitize]
 *   - Sanitation schema.
 * @param {Object?} [options.remarkReactComponents]
 *   - Components.
 * @param {string?} [options.prefix]
 *   - Key prefix.
 * @param {Function?} [options.createElement]
 *   - `h()`.
 */
export function remarkReact({
  createElement = React.createElement,
  sanitize,
  toHast = {},
  remarkReactComponents = {},
  prefix = '',
}: Options): any {
  const clean = sanitize !== false;
  const scheme = sanitize ? sanitize : null;
  const toHastOptions = toHast;

  /**
   * Wrapper around `createElement` to pass
   * components in.
   *
   * @param {string} name - Element name.
   * @param {Object} props - Attributes.
   * @return {ReactElement} - React element.
   */
  // @ts-ignore a
  function h(name: string, props: object, children: React.ReactNode[]) {
    const component = own.call(remarkReactComponents, name) ? remarkReactComponents[name] : name;

    /*
     * Currently, a warning is triggered by react for
     * *any* white-space in tables.  So we remove the
     * pretty lines for now:
     * https://github.com/facebook/react/pull/7081
     */
    if (children && typeof component === 'string' && TABLE_ELEMENTS.indexOf(component) !== -1) {
      children = children.filter(child => {
        return child !== '\n';
      });
    }

    return createElement(component, props, children);
  }

  /**
   * Compile MDAST to React.
   *
   * @param {Node} node - MDAST node.
   * @return {ReactElement} - React element.
   */
  function compile(node: any) {
    console.log(node);
    let hast = {
      type: 'element',
      tagName: 'div',
      properties: {},
      children: toHAST(node, toHastOptions).children,
    };

    if (clean) {
      hast = toSanitize(hast, scheme);
    }

    hast = tableCellStyle(hast);

    return toH(React.createElement, hast, prefix);
  }

  // @ts-ignore
  this.Compiler = compile;
}
