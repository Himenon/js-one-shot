import { CustomEventEmitter, CustomPayload } from '../oneshot';

describe('独自のEventEmitterのテスト', () => {
  let dispatcher: CustomEventEmitter;
  beforeEach(() => {
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

  test('removeできることを確認する', () => {
    dispatcher.addListener('nya', () => undefined);
    dispatcher.addListener('foo', (payload: {foo: string}) => undefined);
    expect(dispatcher.eventNames()).toEqual(['nya', 'foo']);
    dispatcher.removeAllListeners();
    expect(dispatcher.eventNames()).toEqual([]);
  })

  test('複数回セットした場合、多重実行される', () => {
    const fn = jest.fn();
    dispatcher.addListener('nya', () => { fn(); })
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(1);

    dispatcher.addListener('nya', () => { fn(); })
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(3);
  })
});

