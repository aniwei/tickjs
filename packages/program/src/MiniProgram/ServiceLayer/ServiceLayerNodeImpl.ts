
import fs from 'fs-extra';
import debug from 'debug'
import vm from 'vm';
import { resolve } from 'path';
import { MiniProgramServiceLayer } from './ServiceLayer';

const SDKFilePath = (resolve(__dirname, '../WASDK'));
const WAServiceJavaScriptString = fs.readFileSync(resolve(SDKFilePath, 'WAService.js')).toString();

export class MiniProgramServiceLayerNodeImpl extends MiniProgramServiceLayer {
  public config: any | null = null;

  constructor (config) {
    super();

    this.config = config;

    this.injectContext('setTimeout', setTimeout);
    this.injectContext('setInterval', setInterval);
    this.injectContext('clearTimeout', clearTimeout);

    this.injectContext('__wxConfig', config);

    this.injectContext('navigator', {
      userAgent: ''
    });
  }

  evaluateScript (code: string, filename?: string) {
    vm.runInNewContext(code, this.context, {
      filename
    });
  }

  runInContext (context: any | null) {
    this.context = context;
  }

  launch () {
    this.evaluateScript(WAServiceJavaScriptString, 'WAService.js');
  }

  navigate (options) {
    const { openType, appLaunchInfo, view } = options;
    this.subscribeHandler('onAppRoute', {
      openType,
      ...appLaunchInfo
    }, view.id);
  }
}