
import fs from 'fs-extra';
import express from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import regexp from 'regexp-clone';
import debug from 'debug';
import * as esbuild from 'esbuild';
import { join } from 'path';
import { EventEmitter } from 'events';
import homedir from 'home-dir';

import vite from './vite';

import { ViteServerOptions } from './vite';
import { TickMiniProjLoader } from './TickMiniProjLoader';
import { TickMiniProjDefaultConfig } from './TickMiniProjDefaultConfig'
import { DefaultAdapters } from './TickMiniAdapters';



export type Config = {
  root: string,
  port: number,
  cache: string,
  proj: {
    [key: string]: any
  },
  adapters?: {
    [key: string]: any
  }
}

type DefineConfigObject = {
  [key: string]: any
}

type TickInterceptor = {
  path: RegExp,
  handle: Function,
  middle: Function,
  hash?: string | null,
  cache?: string | Buffer | null
}

function defaultMiddle () {}

function defineConfig (
  target: DefineConfigObject,
  source: DefineConfigObject
) { 
  if (source) {
    const sourceKeys: string[] = Object.keys(source);
  
    for (const key of sourceKeys) {
      const src = source[key];
      const tar = target[key];
  
      if (src && typeof src === 'object') {
        if (tar === null || tar === undefined) {
          target[key] = Array.isArray(src) ? [] : {};
        }
  
        defineConfig((target)[key], src);
      } else  {
        target[key] = src;
      }    
    }
  }

  return target;
}


export function defineUserConfig (
  source: DefineConfigObject
) {
  defineConfig(TickMini.config, source);

  return TickMini.config;
}

export class TickMini extends EventEmitter {
  static mini: TickMini | null = null;
  static config: Config = {
    port: 3000,
    root: process.cwd(),
    cache: join(homedir(), '.tickjs'),
    proj: TickMiniProjDefaultConfig,
    adapters: new DefaultAdapters()
  };

  static sharedTickMini (config: Config): TickMini {
    if (this.mini) {
      return this.mini;
    }
    
    return this.mini = new TickMini(config);
  }

  public config: Config;
  public proj: TickMiniProjLoader
  public intercepts: TickInterceptor[] = [];
  
  public app: express.Express | null = null;
    
  constructor (config: Config) {
    super();

    this.config = config;
    this.proj = new TickMiniProjLoader(config.root);
  }

  adapte (api: string, req: IncomingMessage, res: ServerResponse) {
    const { adapters } = this.config;

    if (adapters) {
      if (adapters[api]) {
        return adapters[api](req, res);
      }
    }

    res.statusCode = 404;
    res.end();
  }

  intercept (path: RegExp, middle: Function, handle?: Function) {
    if (handle === undefined) {
      handle = middle as Function;
      middle = defaultMiddle;
    }

    this.intercepts.push({
      path,
      handle,
      middle
     });

    return this;
  }

  prepare (prepareHandler: Function) {
    const { root } = this.config;

    this.intercept(/^\/(([^\/]+)\/([^?]+))(\?[^?]+|.*)/g, (matched: RegExpExecArray) => {
      const [prefix, filename] = matched;
      if (prefix === '@tickjs') {
        if (filename === 'service.ts') {
          matched[1] = `service.js`;
          
          return esbuild.build({
            bundle: true,
            write: false,
            watch: {
              onRebuild(error, result) {
                if (error) {
                  console.error('watch build failed:', error)
                } else {
                  console.error('watch build succeeded:', result)
                }
              },
            },
            entryPoints: [
              join(__dirname,'@tickjs', 'service.ts')
            ],
            outfile: join(__dirname, prefix, `service.js`)
          }).then(res => {
            const { outputFiles } = res;
            const file = outputFiles[0];

            return file.text;
          })
        }
      }
    }, (matched: RegExpExecArray, content?: string) => {
      const [prefix, filename] = matched; 
      switch (prefix) {
        case '@weixin':
        case '@tickjs': {
          if (content) {
            return content;
          }

          const file = join(__dirname, `${prefix}/${filename}`)
          return fs.readFile(file).then(res => res.toString());
        }

        case '@app': {
          switch (filename) {
            case 'service':
              return this.proj.code();
            case 'view':
              return this.proj.view();
          }
        }
      }
    });

    process.nextTick(async () => {
      const config = await this.proj.config();

      defineUserConfig({ proj: config });

      const { port } = this.config;
      const viteOptions: ViteServerOptions = {
        port,
        plugins: [{
          name: 'tick-service-runtime-plugin',
          resolveId: (id: string) => {
            return id;
          },
          load: this.service
        }]
      }

      const app = await vite(viteOptions);

      prepareHandler(app);

      this.emit(`projprepared`, app);
    });

    
    return this;
  }

  start (callback: Function) {
    this.once(`projprepared`, async (app) => {
      app.listen(this.config.port, callback);
    });

    return this;
  }

  service = (id: string) => {
    const index = id.indexOf(__dirname)
    const newId = index === 0 ? id.slice(__dirname.length) : id;
    return new Promise((resolve, reject) => {

      const dispatch = (index: number) => {
        const intercept = this.intercepts[index];

        if (intercept === undefined) {
          resolve(null);
        } else {
          const { path, middle, handle } = intercept;
          
          intercept.path = regexp(path);
          const matched = path.exec(newId);

          if (matched === null) {
            dispatch(index + 1);
          } else {
            const newMatched = [matched[2], matched[3]];

            Promise.resolve(middle(newMatched)).then((content) => handle(newMatched, content)).then(res => {
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