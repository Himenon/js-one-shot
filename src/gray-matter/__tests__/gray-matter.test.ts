import { YAMLException } from 'js-yaml';
import * as path from 'path';
import { getConfigDataFromMarkdown } from '../oneshot';

test('通常のMarkdownが読み込み可能か', () => {
  const params = getConfigDataFromMarkdown(path.join(__dirname, './sample-01.md'));
  expect(params.data).toEqual({});
  expect(params.content).toEqual('<h1>Hello world!</h1>\n');
});

test('MarkdownのHeaderに書いた設定が取得可能か', () => {
  const params = getConfigDataFromMarkdown(path.join(__dirname, './sample-02.md'));
  expect(params.data).toEqual({
    title: 'Hello',
    slug: 'home',
  });
  expect(params.content).toEqual('<h1>Hello world!</h1>\n');
});

test('設定の階層構造の読み込みが可能か', () => {
  const params = getConfigDataFromMarkdown(path.join(__dirname, './sample-03.md'));
  expect(params.data).toEqual({
    meta: {
      'twitter:og': 'twitter-ogp',
    },
  });
  expect(params.content).toEqual('<h1>Hello world!</h1>\n');
});

test('文法が間違っているときのExceptionの確認', () => {
  const t = () => {
    getConfigDataFromMarkdown(path.join(__dirname, './sample-04.md'));
  };
  expect(t).toThrow(YAMLException);
});

test('YAMLの設定の前に文字列が合った場合のExceptionの確認', () => {
  const params = getConfigDataFromMarkdown(path.join(__dirname, './sample-05.md'));
  expect(params.data).not.toEqual({
    meta: {
      title: 'Before Contents',
    },
  });
  expect(params.data).toEqual({});
  expect(params.content).not.toEqual('設定の前に文字列が合った場合');
  expect(params.content).toEqual(`設定の前に文字列が合った場合

---
title: Before Contents
---
`);
});

test('複数のSectionがあるときの処理', () => {
  const params = getConfigDataFromMarkdown(path.join(__dirname, './sample-06.md'));
  expect(params.data).toEqual({
    title: '複数のSectionがある時',
  });
  expect(params.content).toEqual(`設定の前に文字列が合った場合

---
title: 2つ目のSection
section: 2
---
`);
});
