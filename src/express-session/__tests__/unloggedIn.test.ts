import * as supertest from 'supertest';
import { Response } from 'supertest';
import { app, server } from '../oneshot';

jest.unmock('../oneshot');

describe('非ログイン状態', () => {
  afterAll(() => {
    server.close();
  });

  test('`GET:/`のとき、`/login`にリダイレクトする', () => {
    return supertest(app)
      .get('/')
      .expect(302)
      .then((res: Response) => {
        expect(res.header.location).toEqual('/login');
      });
  });

  test('`GET:/login`のタイトル', () => {
    return supertest(app)
      .get('/login')
      .expect(200)
      .then((res: Response) => {
        expect(res.text).toMatch(/<title>Login Page<\/title>/);
      });
  });

  test('`GET:/logout`のとき`login`にリダイレクトする', () => {
    return supertest(app)
      .get('/logout')
      .expect(302)
      .then((res: Response) => {
        expect(res.header.location).toEqual('/login');
      });
  });

  test('`POST:/login`ログインテスト', () => {
    return supertest(app)
      .post('/login')
      .send({ userName: '' })
      .then((res: Response) => {
        expect(res.text).toMatch(/入力が正しくありません。確認して再入力してください。/);
      });
  });
});
