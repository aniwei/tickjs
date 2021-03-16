import webpack from 'webpack';


import { TickProj } from './TickProj';

class TransformFiles extends Map {
  async resolve (id: string) {
    if (this.has(id)) {
      return this.get(`${id}_transformed`) || 
        (await this.transform(id));
    }
  }

  async transform (id: string) {
    const source = await this.get(id);

    webpack({
      entry: []
    })
    
    this.set(`${id}_transformed`, source);

    return source;
  }

  async id (id: string, source: string | Promise<string>) {
    this.set(`/@tickjs/${id}`, source);
  }

  must (id: string) {
    return this.has(id) ? id : null
  }
}

export function TickTransform (proj: TickProj) {
  const name: string = 'tick-runtime-transform-plugin';
  const files: TransformFiles = new TransformFiles();

  files.id(`wxservice`, proj.wx(`wxservice.js`));
  files.id(`wxview`, proj.wx(`wxview.js`));
  files.id(`service`, proj.service());
  
  return {
    name,
    resolveId (id: string) {
      return files.must(id)
    },
    async load (id: string) {
      return files.resolve(id);
    }
  }
}