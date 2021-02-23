import fs from 'fs-extra';
import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { EventEmitter } from 'events';

import {
  invokeCallbackHandler,
  subscribeHandler
} from '../shared'

const SDKFilePath = (resolve(__dirname, '../WASDK'));
const WAWebviewJavaScriptString = fs.readFileSync(resolve(SDKFilePath, 'WAWebview.js')).toString();

export class Page extends EventEmitter {
  public owner: puppeteer.Browser | null = null;
  public inst: puppeteer.Page | null = null;
  public id: number | null = null;

  constructor (id) {
    super();

    this.id = id;
  }

  public async launch (owner) {
    this.owner = owner;
    this.inst = await owner.newPage();

    this.inst?.on('console', (...args) => {
      this.emit('console', ...args)
    });
  }

  injectScripts (scripts) {
    for (const [filename, code] of scripts) {
      this.evaluateScript(code, filename);
    }
  }

  public async evaluateScript (code, filename?) {
    await this.inst?.evaluate(code + `\n//# sourceURL=${filename}`);
  }

  public async runInContext (context) {
    for (const [name, value] of context) {
      const type = typeof value;
      switch (type) {
        case 'string': {
          await this.inst?.evaluate(`window['${name}']=${value}; \n//# sourceURL=${name}`);
          break;
        }

        case 'function': {
          await this.inst?.exposeFunction(name, value);
          break;
        }
      }
    }

    await this.evaluateScript(WAWebviewJavaScriptString, 'WAWebview.js');
  }

  invokeCallbackHandler (callbackId: number | string, data: any) {
    return this.evaluateScript(invokeCallbackHandler(callbackId, data));
  }

  subscribeHandler (name, params, views, options?) {
    return this.evaluateScript(subscribeHandler(name, params, views, options));
  }
}