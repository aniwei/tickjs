
import fs from 'fs-extra';
import vm from 'vm';
import { resolve } from 'path';
import { EventEmitter } from 'events';

import {
  subscribeHandler,
  invokeCallbackHandler
} from '../shared'

const SDKFilePath = (resolve(__dirname, '../WASDK'));
const WAServiceJavaScriptString = fs.readFileSync(resolve(SDKFilePath, 'WAService.js')).toString();

export class Service extends EventEmitter {
  public config: any | null = null;
  public context: any | null = {};

  injectContext (name: string, value: any) {
    this.context[name] = value;

    this.runInContext(this.context);
  }

  evaluateScript (code: string, filename?: string) {
    vm.runInNewContext(code, this.context, {
      filename
    });
  }

  runInContext (context: any | null) {
    this.context = context;
  }

  launch (config) {
    this.injectContext('setTimeout', setTimeout);
    this.injectContext('setInterval', setInterval);
    this.injectContext('clearTimeout', clearTimeout);

    this.injectContext('navigator', {
      userAgent: ''
    });

    this.injectContext('__wxConfig', config);
    this.evaluateScript(WAServiceJavaScriptString, 'WAService.js');
  }

  navigate (id, options) {
    this.subscribeHandler('onAppRoute', options, id);
  }

  invokeCallbackHandler (callbackId: number | string, data: any) {
    return this.evaluateScript(invokeCallbackHandler(callbackId, data));
  }

  subscribeHandler (name, params, callbackId, options?) {
    return this.evaluateScript(subscribeHandler(name, params, callbackId, options));
  }
}