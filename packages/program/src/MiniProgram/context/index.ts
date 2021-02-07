
import { navigator } from './navigator';
import { getWXConfig } from './wxConfig';

import { WeixinJSBridge } from './WeixinJSBridge';
import { WeixinJSCore } from './WeixinJSCore';


export function getMiniProgramContext () {
  const wxConfig = getWXConfig()

  return {
    setInterval,
    setTimeout,
    console,
    navigator,
    // webkit,
    WeixinJSCore,
    // WeixinJSBridge,

    // wx,
    __wxConfig: wxConfig,
  }
}
