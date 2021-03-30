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

  handle = (hmr: any, context: TickMini) => {
    const index = hmr.file.indexOf(context.config.client)
    const newId = index === 0 ? hmr.file.slice(context.config.client.length) : hmr.file;

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
            const newMatched = [newId, hmr];

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
