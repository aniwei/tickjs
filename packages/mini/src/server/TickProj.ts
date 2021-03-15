
import { resolve } from 'path';
import fs from 'fs-extra';

import { TickMini, defaultConfig } from './tick.config';

const assign = Object.assign;

export class TickProj {
  static proj: TickProj | null = null;
  static async sharedProj (config?: TickMini) {
    if (this.proj) {
      return this.proj;
    }

    const proj = new TickProj(config as TickMini);
    await proj.config();

    return this.proj = proj;
  }

  static import (src: string) {    
    return fs.readFile(src);
  }

  public _config: TickMini | null = null;
  public root: string | null = null;
  
  
  constructor (config: TickMini) {
    this._config = config;
    this.root = config.root as string;
  }

  async config () {
    const { files } = this.config;
    
    this._config = assign(this._config, fs.readJSON(resolve(this.root as string, files.config)));

    return this;
  }
}