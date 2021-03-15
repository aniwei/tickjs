
import { resolve, parse } from 'path';
import fs from 'fs-extra';

import { TickMiniConfig, TickAppConfig, TickAppProjFiles } from '../types/TickConfig';
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

  async importConfig () {
    const { root, files, cache } = this.mini;

    const filepath = resolve(<string>root, (<TickAppProjFiles>files).config);
    const config = await TickProj.import(filepath);

    defineConfig(this.mini.config, config);
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

  async wxss (route?: string) {
    const { root, cache, files } = this.mini;
    const prefix = route ? `${root}/${route}` : root;

    const filepath = resolve(
      <string>prefix, 
      route ? 
        (<TickAppProjFiles>files).frame : 
        (<TickAppProjFiles>files).wxss
    )

    const wxss = await TickProj.import(filepath);

    return wxss;
  }

  async service (route?: string) {
    const { root, cache, files } = this.mini;
    const prefix = route ? `${root}/${route}` : root;

    const filepath = resolve(
      <string>prefix, 
      (<TickAppProjFiles>files).service
    );

    const service = await TickProj.import(filepath);

    return service;
  }
}