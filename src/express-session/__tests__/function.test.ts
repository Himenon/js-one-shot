import { getLoginViewContent } from '../oneshot';

jest.unmock('../oneshot');

describe('Requestに依存しない関数のテスト', () => {
  test('ログインページのコンテンツ', () => {
    const result = getLoginViewContent();
    expect(result).toMatch(/<title>Login Page<\/title>/);
  });

  test('エラーメッセージを含んだログインページのコンテンツ', () => {
    const errMessage = 'エラーがあります';
    const result = getLoginViewContent({ message: errMessage });
    expect(result).toMatch(errMessage);
  });
});
