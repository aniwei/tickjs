
import express from 'express';
import homedir from 'home-dir';
import { IncomingMessage, ServerResponse } from 'http';
import { join } from 'path';
import { EventEmitter } from 'events';

import vite from './vite';

import { ViteServerOptions } from './vite';
import { TickMiniProjLoader } from './TickMiniProjLoader';
import { TickMiniProjDefaultConfig } from './TickMiniProjDefaultConfig'
import { DefaultAdapters } from './TickMiniAdapters';
import { defaultTransformer, TickMiniTransformer  } from './TickMiniTransformer';
import { defaultService, TickMiniService } from './TickMiniService';


export type Config = {
  root: string,
  port: number,
  cache: string,
  proj: {
    [key: string]: any
  },
  adapters?: {
    [key: string]: any
  },
  transformer: TickMiniTransformer,
  service: TickMiniService
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


export function defineUserConfig (
  source: DefineConfigObject
) {
  defineConfig(TickMini.config, source);

  return TickMini.config;
}

export class TickMini extends EventEmitter {
  static mini: TickMini | null = null;
  static config: Config = {
    port: 7001,
    root: process.cwd(),
    cache: join(homedir(), '.tickjs'),
    proj: TickMiniProjDefaultConfig,
    adapters: new DefaultAdapters(),
    transformer: defaultTransformer,
    service: defaultService
  };

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

  prepare (prepareHandler: Function) {
    const { root, transformer, service } = this.config;

    process.nextTick(async () => {
      // const config = await this.proj.config();

      // defineUserConfig({ proj: config });

      const { port } = this.config;
      const viteOptions: ViteServerOptions = {
        port,
        plugins: [{
          name: 'tick-service-runtime-plugin',
          resolveId: (id: string) => {
            return id;
          },
          load: (id: string) => service.handle(id, this),
          transform: transformer.handle
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
}