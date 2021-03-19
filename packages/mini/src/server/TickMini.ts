
import fs from 'fs-extra';
import express from 'express';
import debug from 'debug';
import * as esbuild from 'esbuild';
import { join } from 'path';
import { EventEmitter } from 'events';
import homedir from 'home-dir';

import vite from './vite';

import { ViteServerOptions } from './vite';
import { TickMiniProjLoader } from './TickMiniProjLoader';
import { TickMiniProjDefaultConfig } from './TickMiniProjDefaultConfig'


export type Config = {
  root: string,
  port: number,
  cache: string,
  proj: {
    [key: string]: any
  }
}

type DefineConfigObject = {
  [key: string]: any
}

type TickInterceptor = {
  path: RegExp | string,
  handle: Function,
  hash?: string | null,
  cache?: string | Buffer | null
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
    port: 3000,
    root: process.cwd(),
    cache: join(homedir(), '.tickjs'),
    proj: TickMiniProjDefaultConfig
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

  intercept (path: RegExp | string, handle: Function) {
    this.intercepts.push({
      path,
      handle,
     });

    return this;
  }

  prepare (prepareHandler: Function) {
    const { cache, root } = this.config;

    this.intercept(/\/@tickjs\/service/g, async () => {
      try {
        await fs.access(cache);
      } catch (error) {
        await fs.mkdir(cache);
      }

      await esbuild.build({
        bundle: true,
        sourcemap: true,
        entryPoints: [
          join('@tickjs', 'service.ts')
        ],
        outfile: join(cache, `service.js`)
      });

      return await fs.readFile(join(cache, `service.js`));
    });

    this.intercept(/\/@weixin\/wxservice/g, async () => {
      return await this.proj.wx(`wxservice.js`)
    });

    this.intercept(/\/@weixin\/wxview/g, async () => {
      return await this.proj.wx(`wxview.js`)
    });

    this.intercept(/\/@app\/service/g, async () => {
      return await this.proj.code()
    });

    this.intercept(/\/@app\/wxss/g, async () => {
      return await this.proj.view();
    });

    process.nextTick(async () => {
      const config = await this.proj.config();

      console.log(config)

      defineUserConfig({
        proj: config
      });

      const { port } = this.config;
      const viteOptions: ViteServerOptions = {
        port,
        plugins: [{
          name: 'tick-service-runtime-plugin',
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
      callback(app);
    });

    return this;
  }

  service (code: string, id: string) {
    for (const intercept of this.intercepts) {
      const { path, handle } = intercept;

      if (typeof path === 'string') {
        if (id === path) {
          return handle(code, id);
        }
      } else if (typeof path === 'object' && path instanceof RegExp) {
        if (path.test(id)) {
          return handle(code, id);
        }
      }
    }
  }
}