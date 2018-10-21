import { EventEmitter } from 'events';

export class HogeClass {
  public result: string | undefined;
  public hello(payload: {name: string}) {
    this.result = `Hello ${payload.name} !`
  }
}

export interface CustomPayload {
  hoge: {
    name: string
  };
  foo: {
    foo: string;
  };
  add: {
    a: number;
    b: number;
    c: number;
  };
  nya: {};
  reset: undefined;
}

export interface CustomListener {
  hoge: (payload: CustomPayload['hoge']) => void;
  foo: (payload: CustomPayload['foo']) => void;
  add: (payload: CustomPayload['add']) => void;
  nya: (payload: CustomPayload['nya']) => void;
  reset: (payload: CustomPayload['reset']) => void;
}

export class CustomEventEmitter extends EventEmitter {

  private hoge: HogeClass | undefined;

  public setHogeClassEvent(hoge: HogeClass) {
    this.hoge = hoge;
    this.addListener('hoge', (payload: CustomPayload['hoge'])=> {
      if (this.hoge) { this.hoge.hello(payload) };
    });
    this.addListener('reset', () => {
      this.hoge = undefined;
    })
  }

  public on<K extends keyof CustomListener>(event: K, listener : CustomListener[K]): this {
    return super.on(event as string, listener);
  }

  public addListener<K extends keyof CustomListener>(event: K, listener : CustomListener[K]): this {
    return super.addListener(event as string, listener);
  }

  public emit<K extends keyof CustomListener>(event: K, payload: CustomPayload[K]): boolean {
    return super.emit(event, payload);
  }

  public removeListener<K extends keyof CustomListener>(event: K, listener: (...args: any[]) => void): this {
    return super.removeListener(event, listener);
  }
}
