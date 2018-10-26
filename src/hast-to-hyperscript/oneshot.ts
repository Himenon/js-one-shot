// @ts-ignore
import * as toH from 'hast-to-hyperscript'
import * as h from 'hyperscript'


export const main = () => {
  const tree = {
    type: 'element',
    tagName: 'p',
    properties: {id: 'alpha', className: ['bravo']},
    children: [
      {type: 'text', value: 'charlie '},
      {
        type: 'element',
        tagName: 'strong',
        properties: {style: 'color: red'},
        children: [{type: 'text', value: 'delta'}]
      },
      {type: 'text', value: ' echo.'}
    ]
  }

  return toH(h, tree).outerHTML
}
