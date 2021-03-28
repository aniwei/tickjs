import qs from 'qs';
import fs from 'fs-extra';
import regexp from 'regexp-clone';
import * as esbuild from 'esbuild';
import { join } from 'path';
import { defineUserConfig, TickMini } from './TickMini';

function defaultMiddle () {}

export type TickMiniServiceMiddleware = {
  path: RegExp,
  handle: Function,
  middle: Function,
  hash?: string | null,
  cache?: string | Buffer | null
}

export class TickMiniService {
  public middlewares: TickMiniServiceMiddleware[] = [];

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
    const index = id.indexOf(__dirname)
    const newId = index === 0 ? id.slice(__dirname.length) : id;

    console.log(id)

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

export function compose (services: TickMiniService[]) {
  const service = new TickMiniService();

  for (const serv of services) {
    for (const mid of serv.middlewares) {
      service.use(mid.path, mid.middle, mid.handle);
    }
  }

  return service;
}

export const defaultService = new TickMiniService();

defaultService.use(
  /^\/(([^\/]+)\/([^?]+))(\?[^?]+|.*)/g, 
  (matched: RegExpExecArray, context: TickMini) => {
    const [prefix, filename, query] = matched;
    if (prefix === '@tickjs') {
      if (filename === 'service.ts') {
        matched[1] = `service.js`;
        
        return esbuild.build({
          bundle: true,
          write: false,
          watch: true,
          entryPoints: [
            join(__dirname,'@tickjs', 'service.ts')
          ]
        }).then(res => {
          const { outputFiles } = res;
          const file = outputFiles[0];

          return file.text;
        })
      }
    }
  }, (matched: any[], context: TickMini,content?: string) => {
    const [prefix, filename, query] = matched; 
    switch (prefix) {
      case '@proj': {
        switch (filename) {
          case 'context': {
            return context.proj.config().then(config => {
                defineUserConfig({ proj: config })

              return Promise.resolve(JSON.stringify({
                ...context.config.proj,
                env: context.config.env
              }));
            })
          }
        }
      }

      case '@weixin':
      case '@tickjs': {
        if (content) {
          return content;
        }

        switch (filename) {
          default: {
            const file = join(__dirname, `${prefix}/${filename}`)
            return fs.readFile(file).then(res => res.toString());
          }
        }
      }

      case '@app': {
        switch (filename) {
          case 'service':
            return context.proj.code();
          case 'view':
            return context.proj.view();
        }
      }
    }
});