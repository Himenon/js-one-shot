import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as OneShot from '../oneshot';

test('React.MyComponent', () => {
  const comp = React.createElement(OneShot.App, { body: '' });
  expect(comp).toEqual(<OneShot.App body="" />);
});

test('MarkdownからHTMLがレンダリングされていることを確認する', () => {
  const component = renderer.create(<OneShot.App body="# Hello world" />);
  const componentJSON = component.toJSON()!;
  expect(componentJSON).not.toBeNull();
  expect(componentJSON.props.dangerouslySetInnerHTML).not.toBeUndefined();
  expect(componentJSON.props.dangerouslySetInnerHTML.__html).not.toBeUndefined();
  const html = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(html).toBe(`<h1>Hello world</h1>
`);
});

test('code', () => {
  const headings = `
  # Heading1
  ## Heading2
  ### Heading3
  #### Heading4
  ##### Heading5
  ###### Heading6
  `;
  const expectValue = `<h1>Heading1</h1>
<h2>Heading2</h2>
<h3>Heading3</h3>
<h4>Heading4</h4>
<h5>Heading5</h5>
<h6>Heading6</h6>
`;

  const component = renderer.create(<OneShot.App body={headings} />);
  const componentJSON = component.toJSON()!;
  expect(componentJSON).not.toBeNull();
  expect(componentJSON.props.dangerouslySetInnerHTML).not.toBeUndefined();
  expect(componentJSON.props.dangerouslySetInnerHTML.__html).not.toBeUndefined();
  const html = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(html).toBe(expectValue);
});
