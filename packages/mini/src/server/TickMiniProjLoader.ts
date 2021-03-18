import fs from 'fs-extra';
import path from 'path';
import globby from 'globby';

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

  config () {

  }

  view () {

  }

  logic () {
    
  } 
}