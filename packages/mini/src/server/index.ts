import express from 'express';
import debug from 'debug';

import { TickMini, Config } from './TickMini';


class TickMiniConfigError extends Error {}

function isMiniConfigIllegal (config: Config) {
  const { proj } = config;

  if (
    proj.accountInfo === undefined ||
    proj.accountInfo === null
  ) {
    throw new TickMiniConfigError(`Missing account information`);
  } else if (
    proj.appLaunchInfo === undefined ||
    proj.appLaunchInfo === null
  ) {
    throw new TickMiniConfigError(`Missing app luanch information`);
  } else if (
    proj.entryPagePath === undefined ||
    proj.entryPagePath === null ||
    proj.entryPagePath === ''
  ) {
    throw new TickMiniConfigError(`Missing entry page path`);
  }
}

export default async function App (config: Config) {  
  debug('app')(`正在检测配置是否正确`)
  isMiniConfigIllegal(config);

  const mini: TickMini = TickMini.sharedTickMini(config);
  

  debug('app')(`准备启动服务`)
  mini.prepare((app: express.Express) => {
    debug('app')(`已经启动服务，并注册主要中间件`)
    const router: express.Router = express.Router();

    router.use('/@tickjs/context', async (req, res) => {
      res.json(mini.proj);
    });
    // router.post('/@tickjs/api/')

    app.use(router);
  }).start(() => {
    debug('app')(`启动服务成功`)
  })

  

  
}

export {
  defineUserConfig
}