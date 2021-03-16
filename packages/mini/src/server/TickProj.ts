
import { resolve, parse } from 'path';
import fs from 'fs-extra';

import { TickMiniConfig, TickAppProjFiles } from '../types/TickConfig';
import { defineConfig } from './TickConfig';

export class TickProj {
  static proj: TickProj | null = null;
  static sharedProj (config: TickMiniConfig): TickProj {
    if (this.proj) {
      return this.proj;
    }
    
    return this.proj = new TickProj(config);
  }

  static async import (src: string) {   
    const parsed = parse(src);

    switch (parsed.ext) {
      case '.js':
      case '.ts':
      case '.esm':
        return fs.readFile(src);
      case '.json':
        return fs.readJson(src);
    } 
  }

  public mini: TickMiniConfig;
    
  constructor (mini: TickMiniConfig) {
    this.mini = mini;
  }

  async config () {
    const { root, files } = this.mini;

    const filepath = resolve(<string>root, (<TickAppProjFiles>files).config);
    const config = await TickProj.import(filepath);

    defineConfig(this.mini.config, config);
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