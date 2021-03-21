import express from 'express';
import debug from 'debug';

import { TickMini, Config } from './TickMini';

export { defineUserConfig } from './TickMini'; 



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
  }
}


export default async function App (config: Config, callback?: Function) {  
  isMiniConfigIllegal(config);
  debug('app')(`正在检测配置是否正确`)
  const mini: TickMini = TickMini.sharedTickMini(config);
  
  debug('app')(`准备启动服务`)
  return mini.prepare((app: express.Express) => {
    debug('app')(`已经启动服务，并注册主要中间件`)
    const router: express.Router = express.Router();

    router.use('/@tickjs/context', async (req, res) => {
      res.json(mini.config.proj);
    });
    router.post('/@tickjs/api/', async () => {

    })

    app.use(router);
  }).start((app: express.Express) => {
    debug('app')(`启动服务成功`)
    if (typeof callback === 'function') {
      callback(app);
    }
  });  
}
