import express from 'express';
import debug from 'debug';
import path from 'path';
import bodyParser from 'body-parser';

import { IncomingMessage, ServerResponse } from 'http';

import { TickMini, Config } from './TickMini';
export { defineUserConfig } from './TickMini'; 

export * from './TickMiniTransformer';
export * from './TickMiniService';

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
  debug('app')(`正在检测配置是否正确`);
  const mini: TickMini = TickMini.sharedTickMini(config);
  
  return mini.prepare((app: express.Express) => {
    debug('app')(`已经启动服务，并注册主要中间件`);
    const router: express.Router = express.Router();

    router.use(express.static(path.resolve(__dirname, '../../node_modules')));
    
    // router.use('/@tickjs/context', async (req, res) => {
    //   res.json(mini.config.proj);
    // });
    
    router.post('/@tickjs/api/:api(*)', [
      bodyParser.json(), 
      bodyParser.urlencoded()
    ], async (req: IncomingMessage, res: ServerResponse) => {
      const { headers } = req;
      const api = headers['x-api'];

      mini.adapte(api as string, req, res);
    });

    app.use(router);
  }).start((app: express.Express) => {
    debug('app')(`启动服务成功`)
    if (typeof callback === 'function') {
      callback(app);
    }
  });  
}
