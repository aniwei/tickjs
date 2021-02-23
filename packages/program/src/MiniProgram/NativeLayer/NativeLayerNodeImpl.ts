import fs from 'fs-extra';
import { parse } from 'path';
import { MiniProgramNativeLayer } from './NativeLayer';
import { MiniProgramServiceLayerNodeImpl } from '../ServiceLayer';
import { MiniProgramRenderLayerNodeImpl } from '../RenderLayer';
import { MiniProgramNativeInvokerNodeImpl } from './InvokerNodeImpl';

export class MiniProgramNativeLayerNodeImpl extends MiniProgramNativeLayer {
  public invoker: MiniProgramNativeInvokerNodeImpl | null = null;

  isContentLoaded = false;

  constructor (config) {
    super({
      service: new MiniProgramServiceLayerNodeImpl(config),
      renderer: new MiniProgramRenderLayerNodeImpl(config),
      config
    });

    this.invoker = new MiniProgramNativeInvokerNodeImpl(config);
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

      if (parsed.ext === '.json') {
        promises.push(new Promise(async (resolve, reject) => {
          resolve({
            name,
            file,
            content: await fs.readJson(file)
          })
        }));
      } else if (parsed.ext === '.js') {
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

  async launch () {
    const { appLaunchInfo } = this.config;

    return new Promise((resolve, reject) => {
      if (this.isContentLoaded) {
        this.once('contentloaded', async (files) => {
          const {
            wxss,
            service,
          } = files;
    
          await this.service?.launch();
          await this.renderer?.launch();

          this.service?.evaluateScript(service, 'app-service.js');
          this.renderer?.evaluateScript(wxss, 'app-wxss.js');
      
          const view = await this.renderer?.navigate({
            ...appLaunchInfo,
            openType: 'launch'
          });
      
          this.service?.navigate({
            ...appLaunchInfo,
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

  invokeServiceCallbackHandler (callbackId, data) {
    this.service?.invokeCallbackHandler(callbackId, data)
  }

  subscribeServiceHandler (name, data, callbackId, options) {
    this.service?.subscribeHandler(name, data, callbackId, options);
  }

  invokeViewCallbackHandler (callbackId, data) {
    // this.renderer?.invokeCallbackHandler(callbackId, data)
  }

  subscribeViewHandler (name, data, callbackId, options) {
    this.renderer?.subscribeHandler(callbackId, name, data, callbackId, options);
  }

  invokeHandlerFromService = (name, options, callbackId) => {
    this.invoker?.invoke(name, options, callbackId);
  }
  publishHandlerFromService = () => {}

  invokeHandlerFromView = () => {}
  publishHandlerFromView = () => {}
}
