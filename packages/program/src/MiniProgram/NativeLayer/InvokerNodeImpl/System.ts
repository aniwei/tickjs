import { Invoker, InvokerInterface } from './Invoker';

const systemInfo = {
  SDKVersion: '2.13.0',
  batteryLevel: 100,
  benchmarkLevel: 1,
  brand: 'tickjs',
  deviceOrientation: 'portrait',
  devicePixelRatio: 3,
  fontSizeSetting: 16,
  language: 'zh_CN',
  model: 'iPhone X',
  pixelRatio: 3,
  platform: 'mac',
  safeArea: {
    right: 375, 
    bottom: 812, 
    left: 0, 
    top: 44, 
    width: 375
  },
  screenHeight: 812,
  screenWidth: 375,
  statusBarHeight: 44,
  system: 'MacOS 10.0.1',
  version: '7.0.4',
  windowHeight: 724,
  windowWidth: 375,
}

export class AsyncGetter extends Invoker implements InvokerInterface {
  invoke (options, callbackId): void {
    super.invoke(options, callbackId);

    this.data = systemInfo;

    this.success().async();
  }
}

export class SyncGetter extends Invoker implements InvokerInterface {
  invoke (options, callbackId): void {
    super.invoke(options, callbackId);

    this.data = systemInfo;
    
    this.success().sync();
  }
}