
import express from 'express';
// @ts-ignore
import homedir from 'home-dir';
import { IncomingMessage, ServerResponse } from 'http';
import { join, resolve } from 'path';
import { EventEmitter } from 'events';

import TickVite from './TickVite';

import { ViteServerOptions } from './TickVite';
import { TickMiniProjLoader } from './TickMiniProjLoader';
import { TickMiniProjDefaultConfig } from './TickMiniProjDefaultConfig'
import { DefaultAdapters } from './TickMiniAdapters';
import { defaultTransformer, TickMiniTransformer  } from './TickMiniTransformer';
import { defaultService, TickMiniService } from './TickMiniService';
import { TickMiniHMR } from './TickMiniHMR';


export type Config = {
  root: string,
  port?: number,
  cache: string,
  env: {
    [key: string]: any
  },
  proj: {
    [key: string]: any
  },
  adapters?: {
    [key: string]: any
  },
  client: string,
  transformer: TickMiniTransformer,
  service: TickMiniService,
  hmr?: TickMiniHMR
}

type DefineConfigObject = {
  [key: string]: any
}

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

const TickMiniDefaultConfig: Config = {
  env: {
    PORT: 3000,
    CLI: false,
    PKG: true,
  },
  root: process.cwd(),
  cache: join(homedir(), '.tickjs'),
  client: resolve(__dirname, '../../client'),
  proj: TickMiniProjDefaultConfig,
  adapters: new DefaultAdapters(),
  transformer: defaultTransformer,
  service: defaultService
}

export function defineUserConfig (
  source: DefineConfigObject
) {
  defineConfig(TickMini.config, source);

  return TickMini.config;
}

export class TickMini extends EventEmitter {
  static mini: TickMini | null = null;
  static config: Config = TickMiniDefaultConfig

  static sharedTickMini (config: Config): TickMini {
    if (this.mini) {
      return this.mini;
    }
    
    return this.mini = new TickMini(config);
  }

  public config: Config;
  public proj: TickMiniProjLoader
  
  public app: express.Express | null = null;
    
  constructor (config: Config) {
    super();

    this.config = config;
    this.proj = new TickMiniProjLoader(config.root, config);
  }

  adapte (api: string, req: IncomingMessage, res: ServerResponse) {
    const { adapters } = this.config;

    if (adapters) {
      if (adapters[api]) {
        return adapters[api](req, res, this.proj);
      }
    }

    res.statusCode = 404;
    res.end();
  }

  prepare (prepareHandler: Function) {
    const { hmr, transformer, service } = this.config;

    process.nextTick(async () => {
      const { port, env, client } = this.config;
      const viteOptions: ViteServerOptions = {
        client: client,
        port: env.PORT || port,
        plugins: [{
          name: 'tick-service-runtime-plugin',
          resolveId: (id: string) => {
            return id;
          },
          load: (id: string) => service.handle(id, this),
          transform: transformer.handle,
          handleHotUpdate: hmr ? (h) => hmr.handle(h, this) : () => {}
        }]
      }

      const app = await TickVite(viteOptions);
      prepareHandler(app);

      this.emit(`projprepared`, app);
    });

    
    return this;
  }

  start (callback: Function) {
    this.once(`projprepared`, async (app) => {
      app.listen(this.config.env.port, callback);
    });

    return this;
  }
}