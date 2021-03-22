const console = globalThis.console;

export function debug (namespace: string, color: string = '#1c73e7', type: string = 'info') {
  const prefix = ['%c%s%c%s', `color: #fcfdfe;background-color: ${color}` , ` ${namespace} `];
  const rest = '#212225';

  return function (...argv: any[]) {
    const output: Function = (console as any)[type];

    output(...prefix, 'color:' + rest, ...argv.map(value => {
      const t = typeof value;

      if (t === 'string' || t === 'number') {
        return value;
      } else if (t === 'boolean') {
        return String(value);
      } else if (t === 'object') {
        return JSON.stringify(value);
      }
    }))
  }
}

export function nextTick (callback: Function) {
  return new Promise((resolve) => {
    resolve(callback())
  })
}