import { EventEmitter } from 'events';
import { resolve } from 'path';
import debug from 'debug';
import fs from 'fs-extra';
import vm from 'vm';

import {
  getMiniProgramContext
} from './context'

export class VMWare extends EventEmitter {
  static WAServiceFileString: string | null = null;
  static WAAPPServiceFileString: string | null = null;

  static async JSScriptLoader () {
    debug('VMWare')(`加载 SDK JavaScript`);

    if (this.WAServiceFileString === null) {
      debug('VMWare')(`加载 WAService.js`);
      this.WAServiceFileString = String(await fs.readFile(resolve(__dirname, 'thirdParty/WAService.js')))
    }

    if (this.WAAPPServiceFileString === null) {
      debug('VMWare')(`加载 app-service.js`);
      this.WAAPPServiceFileString = String(await fs.readFile(resolve(__dirname, 'thirdParty/app-service.js')))
    }
  }

  public script: vm.Script | null = null;
  public context: object | null = null;
  public appid: string | null = null;

  constructor (appid: string) {
    super();

    this.appid = appid;
  }

  async run () {
    await VMWare.JSScriptLoader();

    this.context = getMiniProgramContext();

    debug('VMWare')(`执行小程序运行环境`);

    Object.assign(globalThis, this.context);

    const script = new vm.Script(VMWare.WAServiceFileString as string, {
      filename: 'WAService.js'
    });

    script.runInThisContext(this.context);

    const app = new vm.Script(VMWare.WAAPPServiceFileString as string, {
      filename: 'app-service.js'
    });

    app.runInThisContext(this.context);    

    const launch = new vm.Script(`WeixinJSBridge.subscribeHandler("onAppRoute", {path: "pages/piece/piece.html", query: {}, openType: "reLaunch"}, 3, {nativeTime: 1612684779258}, )`, {
      filename: 'app-service.js'
    });

    launch.runInThisContext(this.context);
  }

  async destroy () {

  }
}

const env = process.env;
debug('VMWare')(`创建小程序 VMWare：%s`, env.APPID);
const vmware = new VMWare(env.APPID as string);

vmware.run();