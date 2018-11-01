import * as supertest from 'supertest';
import { Response } from 'supertest';
import { app, server } from '../oneshot';

jest.unmock('../oneshot');

describe('ログインしている状態', () => {
  let cookies: string;
  const userName = 'John Smith';
  afterAll(() => {
    server.close();
  });

  test('正常系ログインテスト', () => {
    return supertest(app)
      .post('/login')
      .send({ userName })
      .expect(302)
      .then((res1: Response) => {
        expect(res1.header.location).toEqual('/');
        cookies = res1.header['set-cookie'].pop().split(';')[0];
        expect(cookies).not.toBeUndefined();
      });
  });

  test('/にログイン状態で突入', () => {
    expect(cookies).not.toBeUndefined();
    return supertest(app)
      .get('/')
      .set('Cookie', cookies)
      .expect(200)
      .then((res: Response) => {
        expect(res.text).toMatch(userName);
      });
  });

  test('ログイン状態で /logout に行く', () => {
    return supertest(app)
      .get('/logout')
      .set('Cookie', cookies)
      .expect(302)
      .then((res: Response) => {
        expect(res.header.location).toEqual('/login');
      });
  });
});
