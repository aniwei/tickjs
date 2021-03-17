
import { TickProj } from './TickProj';

class TransformFiles extends Map {
  async resolve (id: string) {
    if (this.has(id)) {
      return this.get(`${id}_cached`) || 
        (await this.wait(id));
    }
  }

  async wait (id: string) {
    const source = await this.get(id);
    
    this.set(`${id}_cached`, source);

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

  files.id(`ServiceRuntime`, proj.)
  
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