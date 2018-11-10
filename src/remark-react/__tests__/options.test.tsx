import * as renderer from 'react-test-renderer';
import * as Options from '../options';

describe('remarkReactComponents', () => {
  test('h1', () => {
    const result = renderer.create(
      Options.remarkReactComponents.h1({
        children: 'hoge',
      }),
    );
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({
      type: 'h2',
      props: {},
      children: ['hoge'],
    });
  });

  test('h2', () => {
    const result = renderer.create(
      Options.remarkReactComponents.h2({
        children: 'foo',
      }),
    );
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({
      type: 'h1',
      props: {},
      children: ['foo'],
    });
  });

  test('a', () => {
    const result = renderer.create(
      Options.remarkReactComponents.a({
        href: 'http://example.com',
        children: 'foo',
      }),
    );
    const jsonValue = result.toJSON();
    expect(jsonValue).toEqual({
      type: 'h1',
      props: {},
      children: ['foo'],
    });
  });
});
