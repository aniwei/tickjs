import fs from 'fs-extra';
import path from 'path';
import { LocalStorage } from 'node-localstorage';
import { Config } from './TickMini';
import { TickWX } from './TickWX';

export class TickMiniProjLoader {
  public weixin: TickWX;
  public root: string;
  public storage: LocalStorage | null = null;
  public account: any;
  public _config: any;

  constructor (root: string = process.cwd(), config: Config) {
    const { proj } = config;

    this.weixin = new TickWX(this);

    this.root = root;
    this.storage = new LocalStorage(path.join(config.cache, proj.accountInfo.appId));
    this.account = proj.accountInfo;
    
    this._config = config;
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