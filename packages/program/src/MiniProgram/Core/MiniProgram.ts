import fs from 'fs-extra';
import { parse } from 'path';
import { EventEmitter } from 'events';
import { Service } from '../Service';
import { Renderer } from '../Renderer';
import { Invoker } from './Invoker';

export class MiniProgram extends EventEmitter {
  public invoker: Invoker | null = null;
  public config: any | null = null;
  public service: Service | null = null;
  public renderer: Renderer | null = null;

  isContentLoaded = false;

  constructor (config) {
    super();

    this.config = config;

    this.service = new Service();
    this.renderer = new Renderer();
    this.invoker = new Invoker();

    this.service?.injectContext('WeixinJSCore', {
      invokeHandler: (name, data, options) => {
        this.emit('invokeservicehandler', name, data, options);
      },
      publishHandler: (name, data, pages) => {
        this.emit('publishservicehandler', name, data, pages);
      }
    });

    this.renderer?.injectContext('WeixinJSCore', {
      invokeHandler: (name, data, options) => {
        this.emit('invokerendererhandler', name, data, options);
      },
      publishHandler: (name, data, pages, options) => {
        debugger;
        this.emit('publishrendererhandler', name, data, pages, options);
      }
    });

    this.on('invokeservicehandler', this.invokeServiceHandler);
    this.on('invokerendererhandler', this.invokeRendererHandler);
    this.on('publishservicehandler', this.publishServiceHandler);
    this.on('publishrendererhandler', this.publishRendererHandler);

    this.on('invokeservicecallbackhandler', this.invokeServiceCallbackHandler);
    this.on('subscribeservicehandler', this.subscribeServiceHandler);

    this.on('invokerenderercallbackhandler', this.invokeRendererCallbackHandler);
    this.on('subscriberendererhandler', this.subscribeRendererHandler);
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
    
          await this.invoker?.binding(this);
          await this.service?.launch(this.config);
          await this.renderer?.launch(this.config);

          this.service?.evaluateScript(service, 'app-service.js');
          this.renderer?.evaluateScript(wxss, 'app-wxss.js');
      
          const page = await this.renderer?.navigate({
            ...appLaunchInfo,
            openType: 'switchTab'
          });
      
          this.service?.navigate(page?.id, {
            ...appLaunchInfo,
            openType: 'switchTab',
          });
        });

        resolve(null);
      } else {
        reject(new Error(`Please load project content at first.`));
      }
    })
  }

  invokeServiceHandler = (name, options, callbackId) => {
    this.invoker?.invoke(name, options, callbackId);
  }

  invokeRendererHandler = () => {}

  publishServiceHandler = (name, data, options) => {
    this.renderer?.subscribeHandler(name, data, options);
  }

  publishRendererHandler = () => {
    debugger;
  }

  invokeServiceCallbackHandler = (callbackId, data) => {
    this.service?.invokeCallbackHandler(callbackId, data);
  }

  subscribeServiceHandler = () => {

  }

  invokeRendererCallbackHandler = (callbackId, data) => {
  }

  subscribeRendererHandler = () => {

  }
}
