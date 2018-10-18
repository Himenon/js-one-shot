export function memorize<T extends any>(f: T): any {
  const cache: { [key: string]: T }  = {}
  return function fn() {
    const key = arguments.length + Array.prototype.join.call(arguments, ',');
    if (key in cache) {
      return cache[key]
    } else {
      // @ts-ignore
      return cache[key] = f.apply(this, arguments)
    };
  }
}