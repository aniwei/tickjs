import { EventEmitter } from 'events';
import { resolve } from 'path';
import debug from 'debug';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';

import { MiniProgramServiceLayer } from '../ServiceLayer'
import { MiniProgramRenderLayer, MiniProgramViewLayer } from './index';
import { MiniProgramViewLayerNodeImpl } from './ViewLayerNodeImpl';

export class MiniProgramRenderLayerNodeImpl extends MiniProgramRenderLayer {
  public views: Map<string, MiniProgramViewLayer> = new Map;
  public owner: MiniProgramServiceLayer | null = null;
  public current: MiniProgramViewLayer | null = null;

  public browser: puppeteer.Browser | null = null;

  
  public config: any | null = null;

  public injectContext (name: string, value: any) {
    const type = typeof value;

    switch (type) {
      case 'object': {
        if (name === 'WeixinJSCore') {
          super.injectContext(`$$invokeHandler`, WeixinJSCore.invokeHandler);
          super.injectContext(`$$publishHandler`, WeixinJSCore.publishHandler);
          super.injectContext('WeixinJSCore', `
            invokeHandler: function () { $$invokeHandler.apply(null, arguments) },
            publishHandler: function () { $$publishHandler.apply(null, arguments) }
          `)
        } else {
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


  public async navigate (options) {
    const { path, navigateType } = options;

    switch (navigateType) {
      case 'navigateBack': {
        break;
      }

      case 'navigateTo': {
        const view = new MiniProgramViewLayerNodeImpl(this);

        await view.open();
        await view.runInContext(this.context);

        this.views.set(path, view);
        this.current = view;
        break;
      }
    }
  }
}

