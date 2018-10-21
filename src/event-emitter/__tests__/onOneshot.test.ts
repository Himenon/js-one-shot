import { CustomEventEmitter } from '../oneshot';

describe('独自のEventEmitterのテスト', () => {
  let dispatcher: CustomEventEmitter;
  beforeAll(() => {
    dispatcher = new CustomEventEmitter()
    dispatcher.removeAllListeners();
  })

  test('dispatchされることを確認する', () => {
    const fn = jest.fn();
    dispatcher.on('nya', () => {
      fn();
    })
    expect(fn.mock.calls.length).toBe(0);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(1);
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(2);
  })

  test('removeできることを確認する', () => {
    dispatcher.on('nya', () => undefined);
    dispatcher.on('foo', (payload: {foo: string}) => undefined);
    expect(dispatcher.eventNames()).toEqual(['nya', 'foo']);
    dispatcher.removeAllListeners();
    expect(dispatcher.eventNames()).toEqual([]);
  })

  test('複数回セットした場合、多重実行される', () => {
    const fn = jest.fn();
    dispatcher.on('nya', () => { fn(); })
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(1);

    dispatcher.on('nya', () => { fn(); })
    dispatcher.emit('nya', {});
    expect(fn.mock.calls.length).toBe(3);
  })
});
