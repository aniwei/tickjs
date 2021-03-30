import qs from 'qs';
// @ts-ignore
import regexp from 'regexp-clone';
import { TickMini } from './TickMini';

function defaultMiddle () {}

export type TickMiniHMRMiddleware = {
  path: RegExp,
  handle: Function,
  middle: Function,
  hash?: string | null,
  cache?: string | Buffer | null
}

export class TickMiniHMR {
  public middlewares: TickMiniHMRMiddleware[] = [];

  use (path: RegExp, middle: Function, handle?: Function) {
    if (handle === undefined) {
      handle = middle as Function;
      middle = defaultMiddle;
    }

    this.middlewares.push({
      path,
      handle,
      middle
     });

    return this;
  }

  handle = (id: string, context: TickMini) => {
    debugger;
    const index = id.indexOf(context.config.client)
    const newId = index === 0 ? id.slice(context.config.client.length) : id;

    return new Promise ((resolve, reject) => {
      const dispatch = (index: number) => {
        const intercept = this.middlewares[index];

        if (intercept === undefined) {
          resolve(null);
        } else {
          const { path, middle, handle } = intercept;
          
          intercept.path = regexp(path);
          const matched = path.exec(newId);

          if (matched === null) {
            dispatch(index + 1);
          } else {
            const query = /^\?/.test(matched[4]) ? 
              qs.parse(matched[4].slice(1)) : {}

            const newMatched = [matched[2], matched[3], query];

            Promise.resolve(middle(newMatched, context))
              .then((content) => handle(newMatched, context, content))
              .then(res => {
                if (res === undefined) {
                  dispatch(index + 1);
                } else {
                  resolve(res)
                }
              });
          }
        }
      }

      dispatch(0);
    });
  }
}
