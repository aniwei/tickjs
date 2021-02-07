

import {
  Navigator,
  WeixinJSCore,
} from './types'

export abstract class MiniProgramScript {
  public context: MiniProgramContext | null = null;
  evaluateScript (script: string, filename?: string) {}
  runInThisContext (context: MiniProgramContext) {}
}

export interface MiniProgram {
  script: MiniProgramScript | null;
}

export interface MiniProgramContext {
  setTimeout?: Function;
  setInterval?: Function;
  navigator?: Navigator;
  console?: Console;
  
  // wechat 
  WeixinJSCore: WeixinJSCore;
  __wxConfig: any;
}

export const subscribeHandler = (name, options, id) => (`
WeixinJSBridge.subscribeHandler(
  "${name}",
  ${JSON.stringify(options)},
  ${id},
  { nativeTime: ${Date.now() / 1000} }
)`);

export const invokeCallbackHandler = (name, options, id) => (`
WeixinJSBridge.invokeCallbackHandler(
  "${name}",
  ${JSON.stringify(options)},
  ${id},
  { nativeTime: ${Date.now() / 1000} }
)`)

export class MiniProgramMachine implements MiniProgram {

  public script: MiniProgramScript | null = null;
  public context: MiniProgramContext | null = null;

  constructor (script) {
    this.script = script;
  }

  runInThisContext (context: MiniProgramContext) {
    this.context = context;
  }

  injectScript (script: string, filename?: string): void {
    this.script?.evaluateScript(script, filename);
  }

  invoke () {

  }

  subscribe (name, options, id) {
    const script = subscribeHandler(name, options, id);
  }

  run (options) {
    this.invoke('onAppRoute', options, id);
  }
}

