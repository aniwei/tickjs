import fs from 'fs-extra';
import path from 'path';

export class TickMiniProjLoader {
  public root: string;

  constructor (root: string = process.cwd()) {
    this.root = root;
  }
  
  async import (src: string) {   
    const parsed = path.parse(src);

    switch (parsed.ext) {
      case '.js':
      case '.ts':
      case '.esm':
        return fs.readFile(src);
      case '.json':
        return fs.readJson(src);
    } 
  }

  wx (filename: string) {
    return this.import(path.resolve(__dirname, `@weixin/${filename}`))
      .then(res => res.toString())
  }

  resolve (filename: string) {
    return path.resolve(this.root, filename);
  }

  config () {
    return this.import(this.resolve('app-config.json'));
  }

  view (r?: string) {
    const filename = r ? this.resolve(r + 'app-frame.js') : 'app-wxss.js';
    return this.import(filename)
      .then(res => res.toString());
  }

  code (r?: string) {
    const filename = r ? this.resolve(r + 'app-service.js') : 'app-service.js'
    return this.import(filename)
      .then(res => res.toString());
  } 
}