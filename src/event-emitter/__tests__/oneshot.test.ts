import { CustomEventEmitter, CustomPayload, HogeClass } from '../oneshot';

describe('独自のEventEmitterのテスト', () => {
  let dispatcher: CustomEventEmitter;
  beforeAll(() => {
    dispatcher = new CustomEventEmitter()
    dispatcher.removeAllListeners();
  })

  test('dispatchされることを確認する', () => {
    const fn = jest.fn();
    dispatcher.addListener('nya', () => {
      fn();
    })
    expect(fn.mock.calls.length).toBe(0);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(1);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(2);
  })

  test('引数がある場合', () => {
    const fn = jest.fn((x: number, y: number, z: number) => x + y + z);
    dispatcher.addListener('add', (payload: CustomPayload['add']) => {
      fn(payload.a, payload.b, payload.c)
    });
    dispatcher.emit('add', { a: 1, b: 2, c: 3});
    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe(2);
    expect(fn.mock.calls[0][2]).toBe(3);
    expect(fn.mock.results[0].value).toBe(6);
  })
  
  test('特定のイベントリスナーの着脱を確認する', () => {
    const fn = jest.fn(() => undefined);
    // 1回目
    dispatcher.addListener('nya', fn);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(1);
    // 外す
    dispatcher.removeListener('nya', fn);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(1);
    // 2回目
    dispatcher.addListener('nya', fn);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(2);
  })

  test('HogeClassのセットしたときとセットしていないときの挙動を確認', () => {
    const hoge = new HogeClass();
    const hello = jest.fn((payload: CustomPayload['hoge']) => `hello ${payload.name}`);;
    expect(hello.mock.calls.length).toBe(0);
    dispatcher.emit('hoge', {
      name: 'first'
    })
    hoge.hello = hello;
    dispatcher.setHogeClassEvent(hoge);
    dispatcher.emit('hoge', {
      name: 'second'
    })
    expect(hello.mock.calls.length).toBe(1);
    expect(hello.mock.results[0].value).toBe('hello second');
  })

  test('HogeClassの状態変化', () => {
    const hoge = new HogeClass();
    expect(hoge.result).toBeUndefined();
    dispatcher.emit('hoge', {
      name: 'hogeee'
    });
    expect(hoge.result).not.toBe('Hello hogeee !');
    dispatcher.addListener('hoge', hoge.hello)
    dispatcher.emit('hoge', {
      name: 'ふえええ'
    });
    expect(hoge.result).not.toBe('Hello ふえええ !');
  })

  test('HogeClassのリセット', () => {
    const dispatcher2 = new CustomEventEmitter();
    const hoge = new HogeClass();
    const hello = jest.fn((payload: CustomPayload['hoge']) => `hello ${payload.name}`);;
    hoge.hello = hello;
    
    expect((dispatcher2 as any ).hoge).toBeUndefined();
    dispatcher2.emit('hoge', { name: 'foo' });
    expect(hello.mock.calls.length).toBe(0);

    dispatcher2.setHogeClassEvent(hoge);
    expect((dispatcher2 as any ).hoge).toEqual(hoge);
    expect((dispatcher2 as any ).hoge instanceof HogeClass).toBeTruthy();

    dispatcher2.emit('hoge', { name: 'foo' });
    expect(hello.mock.calls.length).toBe(1);
    expect(hello.mock.results[0].value).toBe('hello foo');

    dispatcher2.emit('reset', undefined);
    expect((dispatcher2 as any ).hoge).toBeUndefined();
    dispatcher2.emit('hoge', { name: 'foo' });
    expect(hello.mock.calls.length).toBe(1);
    expect(hello.mock.results[1]).toBeUndefined();
  })
});

