import { converter } from '../mdx-sample';

const templateText = `
# Hello World

body message

## h2 title

highlight
`;

// tslint:disable:max-line-length
const expectValue =
  'export default ({components, ...props}) => <MDXTag name="wrapper"  components={components}><MDXTag name="h1" components={components}>{`Hello World`}</MDXTag>';

describe('hello', async () => {
  const result = await converter(templateText);
  expect(result).toBe(expectValue);
});
