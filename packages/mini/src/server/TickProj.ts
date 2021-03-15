
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

  async libs () {
    const files = ['WAService.js', 'WAWebview.js'];
    const libs = new Map();

    const buffers = await Promise.all(files.map(filename => {
      return {
        filename,
        data: TickProj.import(resolve(`${__dirname}/libs`, filename))
      }
    }));

    for (const buffer of buffers) {
      libs.set(buffer.filename, buffer.data)
    }

    return libs;
  }

  async frame (route?: string) {
    const { root, files } = this.config;
    const filepath = route ? `${root}/${route}` : root;

    const frame = (await TickProj.import(resolve(filepath, files.frame)));

    return frame;
  }

  async wxss (route?: string) {
    const { root, cache, files } = this.config;
    const filepath = route ? `${root}/${route}` : root;

    const wxss = (await TickProj.import(resolve(filepath, files.wxss)));

    return wxss;
  }

  async service (route?: string) {
    const { root, cache, files } = this.config;
    const filepath = route ? `${root}/${route}` : root;

    const service = (await TickProj.import(resolve(filepath, files.service)));

    return service;
  }
}