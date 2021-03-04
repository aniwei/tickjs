import debug from 'debug';
import * as shared from './shared';
import { Server } from './server';

class MiniProgramConfigError extends Error {}

function isIllegalMiniProgramOptions (config) {
  if (config.accountInfo === undefined) {
    throw new MiniProgramConfigError(`缺少账号信息`);
  }

  if (config.appLaunchInfo === undefined) {
    throw new MiniProgramConfigError(`缺少启动信息`);
  }

  if (config.entryPagePath === undefined) {
    throw new MiniProgramConfigError(`缺少入口路由`);
  }
}

export async function createMiniProgram (options, config) {
  const port = options.port || process.env.PORT || shared.port;
  const cwd = options.cwd || process.cwd();
  const appid = options.appid;
  const device = { ...shared.device, ...options.device }
  const types = { ...shared.types, ...options.invokeTypes }
  const system = {
    ...shared.system,
    ...options.system,
  }

  config = { 
    ...shared.config, 
    ...config,
  }

  isIllegalMiniProgramOptions(config);

  const server = await Server();

  server.context.__TICK_MINI_PROGRAM = {
    types: types,
    config: config,
    device: device,
    system: system,
    appid: appid,
    project: cwd,
  }
  
  server.listen(port, () => {
    debug('MiniProgram')('监听服务，端口：', port);
  });

  return server;
}