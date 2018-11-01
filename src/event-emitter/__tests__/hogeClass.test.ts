import { CustomEventEmitter, CustomPayload, HogeClass } from '../oneshot';

describe('hogeClassをセットした場合の挙動', () => {
  let dispatcher: CustomEventEmitter;
  beforeEach(() => {
    dispatcher = new CustomEventEmitter();
    dispatcher.removeAllListeners();
  });

  test('HogeClassのセットしたときとセットしていないときの挙動を確認', () => {
    const hoge = new HogeClass();
    const hello = jest.fn((payload: CustomPayload['hoge']) => `hello ${payload.name}`);
    expect(hello.mock.calls.length).toBe(0);
    dispatcher.emit('hoge', {
      name: 'first',
    });
    hoge.hello = hello;
    dispatcher.setHogeClassEvent(hoge);
    dispatcher.emit('hoge', {
      name: 'second',
    });
    expect(hello.mock.calls.length).toBe(1);
    expect(hello.mock.results[0].value).toBe('hello second');
  });

  test('HogeClassの状態変化', () => {
    const hoge = new HogeClass();
    expect(hoge.result).toBeUndefined();
    dispatcher.emit('hoge', {
      name: 'hogeee',
    });
    expect(hoge.result).not.toBe('Hello hogeee !');
    dispatcher.addListener('hoge', hoge.hello);
    dispatcher.emit('hoge', {
      name: 'ふえええ',
    });
    expect(hoge.result).not.toBe('Hello ふえええ !');
  });

  test('HogeClassのリセット', () => {
    const hoge = new HogeClass();
    const hello = jest.fn((payload: CustomPayload['hoge']) => `hello ${payload.name}`);
    hoge.hello = hello;

    expect((dispatcher as any).hoge).toBeUndefined();
    dispatcher.emit('hoge', { name: 'foo' });
    expect(hello.mock.calls.length).toBe(0);

    dispatcher.setHogeClassEvent(hoge);
    expect((dispatcher as any).hoge).toEqual(hoge);
    expect((dispatcher as any).hoge instanceof HogeClass).toBeTruthy();

    dispatcher.emit('hoge', { name: 'foo' });
    expect(hello.mock.calls.length).toBe(1);
    expect(hello.mock.results[0].value).toBe('hello foo');

    dispatcher.emit('reset', undefined);
    expect((dispatcher as any).hoge).toBeUndefined();
    dispatcher.emit('hoge', { name: 'foo' });
    expect(hello.mock.calls.length).toBe(1);
    expect(hello.mock.results[1]).toBeUndefined();
  });
});
