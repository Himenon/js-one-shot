import * as Sample from '../sample';

const inputValue = '## Hello, <i>world</i>! ##';

describe('rehype-stringify@4.0.0, remark-parse@5.0.0, remark-stringify@5.0.0, remark-cli@5.0.0におけるテスト', () => {
  test('[1] parse + remark2rehype + html', () => {
    const result = Sample.main1(inputValue);
    expect(result).toEqual('<h2>Hello, world!</h2>');
  });

  test('[2] parse + remark2rehype(+options) + html(+options)', () => {
    const result = Sample.main2(inputValue);
    expect(result).toEqual('<h2>Hello, <i>world</i>!</h2>');
  });

  test('[3] parse + remark2rehype(+unified) + remark-stringify', () => {
    const result = Sample.main3(inputValue);
    expect(result).toEqual('## Hello, <i>world</i>!\n');
  });

  test('[4] parse + remark2rehype(+unified, +options) + remark-stringify', () => {
    const result = Sample.main4(inputValue);
    expect(result).toEqual('## Hello, <i>world</i>!\n');
  });
});
