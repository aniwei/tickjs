import fs from 'fs-extra';
import { EventEmitter } from 'events';
import { parse, resolve } from 'path';
import { MiniProgramNativeLayer } from './index'
import { MiniProgramRenderLayer } from '../RenderLayer';
import { MiniProgramServiceLayerNodeImpl } from '../ServiceLayer';

export class MiniProgramNativeLayerNodeImpl extends MiniProgramNativeLayer {
  isContentLoaded = false;

  static import (files) {
    const miniProgram = new MiniProgramNativeLayerNodeImpl(files);

    miniProgram.import(files);

    return miniProgram;
  }

  content (files) {
    process.nextTick(() => {
      this.emit('contentloaded', files);
    })

    return this;
  }

  import (files)  {
    const promises: Promise<any>[] = [];

    this.isContentLoaded = true;

    for (const name of Object.getOwnPropertyNames(files)) {
      const file = files[name];
      const parsed = parse(file);

      if (parsed.ext === 'json') {
        promises.push(new Promise(async (resolve, reject) => {
          resolve({
            name,
            file,
            content: await fs.readJson(file)
          })
        }));
      } else if (parsed.ext === 'js') {
        promises.push(new Promise(async (resolve, reject) => {
          resolve({
            name,
            file,
            content: (await fs.readFile(file)).toString()
          })
        }));
      }
    }

    Promise.all(promises).then(contents => {
      const files = {};

      for (const { name, file, content } of contents) {
        files[name] = content;
      }

      this.emit('contentloaded', files);
    });

    return this;
  }

  async launch (options) {
    return new Promise((resolve, reject) => {
      if (this.isContentLoaded) {
        this.once('contentloaded', async (files) => {
          const {
            config,
            wxss,
            service,
          } = files;

          options = {
            ...config,
            ...options
          }
    
          await this.service?.launch(options);
          await this.renderer?.launch(options);

          this.service?.evaluateScript(service, 'app-service.js');
          this.renderer?.evaluateScript(wxss, 'app-wxss.js');
      
          const view = await this.renderer?.navigate({
            appLaunchInfo: options.appLaunchInfo,
            openType: 'launch'
          });
      
          this.service?.navigate({
            appLaunchInfo: options.appLaunchInfo,
            openType: 'launch',
            view
          });
        });

        resolve(null);
      } else {
        reject(new Error(`Please load project content at first.`));
      }
    })
  }

  invokeHandlerFromService = () => {}
  publishHandlerFromService = () => {}

  invokeHandlerFromView = () => {}
  publishHandlerFromView = () => {}
}
