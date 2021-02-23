import debug from 'debug';
import puppeteer from 'puppeteer';
import { EventEmitter } from 'events';

import { Page } from './Page';

export class Renderer extends EventEmitter {
  public pages: Map<number, Page> = new Map;
  public stack: Page[] = [];
  public current: Page | null = null;
  public browser: puppeteer.Browser | null = null;
  public config: any | null = null;
  public scripts: Map<string, string> = new Map();
  public context: Map<string, string> = new Map();

  public injectContext (name: string, value: any) {
    const type = typeof value;

    switch (type) {
      case 'object': {
        if (name === 'WeixinJSCore') {
          this.context.set('$$invokeHandler', value.invokeHandler);
          this.context.set('$$publishHandler', value.publishHandler);
          this.context.set('WeixinJSCore', `{
            invokeHandler: function () { $$invokeHandler.apply(null, arguments) },
            publishHandler: function () { $$publishHandler.apply(null, arguments) }
          }`);
        } else {
          this.context.set(name, JSON.stringify(value));
        }

        break;
      }

      default: {
        this.context.set(name, value); 
        break;
      }
    }
  }

  public async launch (config) {
    this.config = config;
    this.browser = await puppeteer.launch();

    this.injectContext('__wxConfig', config)
  }

  public newPage () {
    return this.browser?.newPage();
  }

  evaluateScript (code, filename) {
    this.scripts.set(filename, code);
  }

  public async navigate (options): Promise<Page | null> {
    const { path, openType } = options;

    switch (openType) {
      case 'switchTab': 
      case 'navigateTo': {
        const id = 1;
        const page = new Page(id);

        await page.launch(this);
        await page.runInContext(this.context);
        await page.injectScripts(this.scripts);

        page.on('console', (message) => {
          debugger;
          console.log('「page」', message);
        })

        this.pages.set(id, page);
        this.stack.push(page);

        this.current = page;

        return page;
      }
    }

    return null;
  }

  invokeCallbackHandler (id, callbackId: number | string, data: any) {
    
  }

  subscribeHandler (name, data, options) {
    const [webviewId] = JSON.parse(options);

    debugger;

    if (typeof webviewId !== 'undefined') {
      const page = this.pages.get(webviewId);
      page?.subscribeHandler(name, data, options);
    } else {
      
      this.current?.subscribeHandler(name, data, options);
    }
  }
}

