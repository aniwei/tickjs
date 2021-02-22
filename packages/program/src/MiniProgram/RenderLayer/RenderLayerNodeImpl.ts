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

  public newView () {
    return this.browser?.newPage();
  }

  evaluateScript (code, filename) {
    this.scripts.set(filename, code);
  }

  public async navigate (options): Promise<MiniProgramViewLayer | null> {
    const { path, navigateType } = options;

    switch (navigateType) {
      case 'navigateBack': {
        if (this.current !== null) {
          this.current = this.views.pop();
        }

        return null;
      }

      case 'navigateTo': {
        const view = new MiniProgramViewLayerNodeImpl(this);

        await view.open();
        await view.runInContext(this.context);

        for (const [code, filename] of this.scripts) {
          await view.evaluateScript(code, filename);
        }

        this.views.push({ id: view.id, path, view });
        this.current = view;

        return view;
      }
    }

    return null;
  }
}

