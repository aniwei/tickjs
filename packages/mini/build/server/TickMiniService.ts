import qs from 'qs';
import fs from 'fs-extra';
// @ts-ignore
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

  match (id: string, context: TickMini) {
    const index = id.indexOf(context.config.client)
    const newId = index === 0 ? id.slice(context.config.client.length) : id;

    for (const middle of this.middlewares) {
      const { path } = middle;

      if (regexp(path).test(newId)) {
        return id;
      }
    }

    return null;
  }

  handle = (id: string, context: TickMini) => {
    const index = id.indexOf(context.config.client)
    const newId = index === 0 ? id.slice(context.config.client.length) : id;

    return new Promise ((resolve, reject) => {
      const dispatch = (index: number) => {
        const mid = this.middlewares[index];

        if (mid === undefined) {
          resolve(null);
        } else {
          const { path, middle, handle } = mid;
          
          mid.path = regexp(path);
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
            join(context.config.client,'@tickjs', 'service.ts')
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
            const file = join(context.config.client, `${prefix}/${filename}`)
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