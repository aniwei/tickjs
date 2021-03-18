import randomcolor from 'randomcolor';

const console = globalThis.console;

export function debug (namespace: string, type: string = 'info') {
  const prefix = ['%c%s%c%s', `color:` + randomcolor(), `【${namespace}】`];
  const rest = randomcolor();

  return function (...argv: any[]) {
    const output: Function = (console as any)[type];

    output(...prefix, 'color:' + rest, argv.map(value => {
      const t = typeof value;

      if (t === 'string' || t === 'number') {
        return value;
      } else if (t === 'boolean') {
        return String(value);
      } else if (t === 'object') {
        return JSON.stringify(value);
      }
    }).join(', '))
  }
}