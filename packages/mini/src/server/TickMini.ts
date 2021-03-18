
import fs from 'fs-extra';
import globy from 'globy';
import { resolve, parse } from 'path';

import { EventEmitter } from 'events';
import vite from './vite';
import { defineConfig } from './TickConfig';
import { ViteServerOptions } from './vite';
import { TickMiniProjLoader } from './TickMiniProjLoader';

import { TickMiniProjDefaultConfig } from './TickMiniProjDefaultConfig'

export type ProjConfig = {
  
}

export type Config = {
  root: string,
  port: number,
  proj: ProjConfig
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
      const src = (<any>source)[key];
      const tar = (<any>target)[key];
  
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
  static config: {
    port: 3000,
    root: process.cwd(),
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
    
  constructor (config: Config) {
    super();

    this.config = config;
    this.proj = new TickMiniProjLoader(config.root);
  }

  async prepare () {
    const { root } = this.config;
    await this.proj.config();

    this.emit(`projprepared`)
  }

  start () {
    this.once(`projprepared`, async () => {
      const { port } = this.config;
      const viteOptions: ViteOptions = {
        port,
        plugins: [{
          name: 'tick-service-runtime-plugin',
          resolveId (id: string) {

          },

          load (id: string) {

          }
        }]
      }

      const app = vite(viteOptions);
    })

    return this;
  }

  resolve (prefix:string, filename?: string) {
    if (filename === undefined) {
      const { root } = this.mini;
      filename === prefix;
      prefix = root || '';
    } 

    switch (prefix) {
      case '@tickjs':
      case '@weixin': {
        return resolve(`${__dirname}/${prefix}`, filename || '');
      }

      default: {
        return resolve(`${prefix}`, filename || '');
      }
    }
  }

  wxss (route?: string) {
    const { root, files } = this.mini;
    const prefix = (route ? `${root}/${route}` : root) || '';
    const filename = route ? 
      (<TickAppProjFiles>files).frame : 
      (<TickAppProjFiles>files).wxss

    return this.resolve(prefix, filename);
  }

  service (route?: string) {
    const { root, files } = this.mini;
    const prefix = (route ? `${root}/${route}` : root) || '';
 
    return this.resolve(prefix, (<TickAppProjFiles>files).service);
  }
}