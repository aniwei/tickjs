
import { resolve, parse } from 'path';
import fs from 'fs-extra';

import { TickMiniConfig, TickAppConfig } from '../types/TickConfig';
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

  public config: TickMiniConfig;
  public service: Buffer | null = null;
  public wxss: Buffer | null = null;
  public frame: Map<string, Buffer> = new Map();
    
  constructor (config: TickMiniConfig) {
    this.config = config;
  }

  async importConfig () {
    const { root, files, cache } = this.config;

    if (cache) {

    }

    const config = (await TickProj.import(resolve(root, files.config))) as TickAppConfig;

    defineConfig(this.config, config);

    return this.config;
  }

  async importLibs () {

  }

  async import () {
    const proxy = new Proxy({}, {
      get (target, p) {
        return proxy;
      }
    });
  }

  async importService () {
    const { root, cache, files } = this.config;
    const service = (await TickProj.import(resolve(root, files.service)));
  }
}