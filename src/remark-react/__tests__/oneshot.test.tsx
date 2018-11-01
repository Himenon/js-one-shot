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
  expect(html).toBe(`<h1>Hello world</h1>\n`);
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
  const expectValue = `<h1>Heading1</h1>\n<h2>Heading2</h2>\n<h3>Heading3</h3>\n<h4>Heading4</h4>\n<h5>Heading5</h5>\n<h6>Heading6</h6>\n`;

  const component = renderer.create(<OneShot.App body={headings} />);
  const componentJSON = component.toJSON()!;
  expect(componentJSON).not.toBeNull();
  expect(componentJSON.props.dangerouslySetInnerHTML).not.toBeUndefined();
  expect(componentJSON.props.dangerouslySetInnerHTML.__html).not.toBeUndefined();
  const html = componentJSON.props.dangerouslySetInnerHTML.__html;
  expect(html).toBe(expectValue);
});
