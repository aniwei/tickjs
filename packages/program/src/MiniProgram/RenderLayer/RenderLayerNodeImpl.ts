import { EventEmitter } from 'events';
import { resolve } from 'path';
import debug from 'debug';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';

import { MiniProgramServiceLayer } from '../ServiceLayer/ServiceLayer'
import { MiniProgramRenderLayer, MiniProgramViewLayer } from './RenderLayer';
import { MiniProgramViewLayerNodeImpl } from './ViewLayerNodeImpl';

export class MiniProgramRenderLayerNodeImpl extends MiniProgramRenderLayer {
  static ViewLayer = MiniProgramViewLayerNodeImpl;

  public browser: puppeteer.Browser | null = null;
  public config: any | null = null;
  public scripts: Map<string, string> = new Map();

  constructor (config) {
    super();

    this.config = config;

    this.injectContext('__wxConfig', config);
  }

  public injectContext (name: string, value: any) {
    const type = typeof value;

    switch (type) {
      case 'object': {
        if (name === 'WeixinJSCore') {
          super.injectContext(`$$invokeHandler`, value.invokeHandler);
          super.injectContext(`$$publishHandler`, value.publishHandler);
          super.injectContext('WeixinJSCore', `{
            invokeHandler: function () { $$invokeHandler.apply(null, arguments) },
            publishHandler: function () { $$publishHandler.apply(null, arguments) }
          }`)
        } else {
          super.injectContext(name, JSON.stringify(value));
          //
        }

        break;
      }

      default: {
        super.injectContext(name, value); 
        break;
      }
    }
  }

  public async launch () {
    this.browser = await puppeteer.launch();
  }

  public newView () {
    return this.browser?.newPage();
  }

  evaluateScript (code, filename) {
    this.scripts.set(filename, code);
  }

  public async navigate (options): Promise<MiniProgramViewLayer | null> {
    const { path, openType } = options;

    switch (openType) {
      case 'navigateBack': {
        if (this.current !== null) {
          this.current = this.views.pop();
        }

        return null;
      }

      case 'redirectTo': {


        break;
      }

      case 'reLaunch': {
        this.views = [];
      }

      case 'launch': 
      case 'navigateTo': {
        const view = new MiniProgramViewLayerNodeImpl(this);

        await view.open();
        await view.runInContext(this.context);

        for (const [filename, code] of this.scripts) {
          debugger;
          await view.evaluateScript(filename, code);
        }

        this.views.push({ id: view.id, path, view });
        this.current = view;

        return view;
      }
    }

    return null;
  }

  invokeCallbackHandler (id, callbackId: number | string, data: any) {
    for (const view of this.views) {
      if (id === view.id) {
        view.invokeCallbackHandler(callbackId, data);
        break;
      }
    }
  }

  subscribeHandler (id, name, params, callbackId, options?) {
    for (const view of this.views) {
      if (id === view.id) {
        view.subscribeHandler(name, params, callbackId, options);
        break;
      }
    }
  }
}

