import fs from 'fs-extra';
import * as esbuild from 'esbuild';
import { resolve } from 'path';

import { TickProj } from './TickProj';

class TransformFiles extends Map {

  public files: string[] = [];

  async intercepting (id: string) {
    const resolveId = this.resolve(id);

    if (resolveId) {
      const transform = this.get(resolveId);
      const code = String(await transform());
      return code;
    }
  }

  async intercept (id: string, transoform: Function) {
    this.set(id, transoform);
    this.files.push(id);
    return this;
  }

  resolve (id: string) {
    for (const file of this.files) {
      if (id.indexOf(file) > -1) {
        return file;
      }
    }
  }
}

export function TickApp (proj: TickProj) {
  const name: string = 'tick-app-plugin';
  const files: TransformFiles = new TransformFiles();

  files.intercept(
    `/@tickjs/ServiceRuntime`, 
    async () => {
      await esbuild.build({
        bundle: true,
        sourcemap: true,
        entryPoints: [proj.resolve('@tickjs', 'ServiceRuntime.ts')],
        outfile: proj.resolve('@tickjs', '.ServiceRuntime.js')
      });

      return fs.readFile(proj.resolve('@tickjs', '.ServiceRuntime.js'))
    }
  );

  files.intercept(
    '/@weixin/wxservice',
    async () => {
      return fs.readFile(proj.resolve('@weixin', 'wxservice.js'));
    }
  );

  files.intercept(
    '/@weixin/wxview',
    async () => {
      return fs.readFile(proj.resolve('@weixin', 'wxview.js'));
    }
  );

  files.intercept(
    '/@tickjs/app/service',
    async () => {
      return fs.readFile(proj.service());
    }
  );

  files.intercept(
    '/@tickjs/app/wxss',
    async () => {
      return fs.readFile(proj.wxss());
    }
  );

  
  return {
    name,
    resolveId (id: string) {
      return files.resolve(id);
    },

    async load (id: string) {
      return files.intercepting(id);
    }
  }
}