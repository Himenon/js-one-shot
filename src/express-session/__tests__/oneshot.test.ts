import * as supertest from 'supertest';
import { Response } from 'supertest';
import { app, getLoginViewContent, server } from '../oneshot';

jest.unmock('../oneshot');

describe('routing', () => {
  afterEach(() => {
    server.close();
  });

  test('/ に行ったときに /loginにリダイレクトされる', () => {
    return supertest(app).get('/').expect(302).then((res: Response) => {
      expect(res.header.location).toEqual('/login');
    });
  });

  test('/loginのタイトルを確認する', () => {
    return supertest(app).get('/login').expect(200).then((res: Response)  => {
      expect(res.text).toMatch(/<title>Login Page<\/title>/);
    });
  });

  test('/logoutに行ったときに、loginに飛ばされる', () => {
    return supertest(app).get('/logout').expect(302).then((res: Response) => {
      expect(res.header.location).toEqual('/login');
    });
  });

  test('getLoginViewContent', () => {
    const result = getLoginViewContent();
    expect(result).toMatch(/<title>Login Page<\/title>/);
  });

  test('Errorを含むgetLoginViewContent', () => {
    const errMessage = 'エラーがあります';
    const result = getLoginViewContent({ message: errMessage });
    expect(result).toMatch(errMessage);
  });
});
