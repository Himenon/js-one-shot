import * as ReactDOM from 'react-dom/server';
import { converter, mdxToHtml } from '../mdx-sample';

const templateText = `
# Hello World

body message

## h2 title

highlight
`;

const resultTest = '<div><h1>Hello World</h1><p>body message</p><h2>h2 title</h2><p>highlight</p></div>';

// tslint:disable:max-line-length
const expectValue = `

<MDXTag name="wrapper"  components={components}><MDXTag name="h1" components={components}>{\`Hello World\`}</MDXTag>
<MDXTag name="p" components={components}>{\`body message\`}</MDXTag>
<MDXTag name="h2" components={components}>{\`h2 title\`}</MDXTag>
<MDXTag name="p" components={components}>{\`highlight\`}</MDXTag></MDXTag>`;

test('hello', async () => {
  const result = await converter(templateText);
  expect(result).toBe(expectValue);
});

test('hello2', async () => {
  const component = await mdxToHtml(templateText);
  const renderResult = ReactDOM.renderToStaticMarkup(component);
  expect(renderResult).toEqual(resultTest);
});
