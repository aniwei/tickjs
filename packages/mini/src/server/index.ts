import express from 'express';
import debug from 'debug';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';
import * as qrcode from 'qrcode';
import { PassThrough } from 'stream';
import { IncomingMessage, ServerResponse } from 'http';

import { TickMini, Config } from './TickMini';
import { TickWX, TickWXResultState } from './TickWX';
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
    
    router.post('/@weixin/api/:api(*)', [
      bodyParser.json(), 
      bodyParser.urlencoded()
    ], async (req: IncomingMessage, res: ServerResponse) => {
      const { headers } = req;
      const api = headers['x-api'];

      mini.adapte(api as string, req, res);
    });

    router.get('/@weixin/icon', (req, res) => {
      res.statusCode = 200;
      
      axios.get(mini.config.proj.accountInfo.icon, {
        responseType: 'arraybuffer'
      }).then(result => {
        res.statusCode = 200;
        res.type('png').send(result.data).end();
      })
    });

    router.get('/@weixin/name', (req, res) => {
      res.statusCode = 200;
      
      res.statusCode = 200;
      res.json({
        name: mini.config.proj.accountInfo.nickname
      }).end();
    });

    router.get('/@weixin/signIn/polling/:id', (req, res) => {
      const authorizion = mini.proj.storage?.getItem(`@weixin:authorizion`);

      if (authorizion) {
        res.status(200)
          .json(JSON.parse(authorizion))
          .end();
      } else {
        const result = TickWX.results.get(req.params.id);

        if (result) {
          if (result.state === TickWXResultState.SUCCESS) {
            mini.proj.storage?.setItem(`@weixin:authorizion`, JSON.stringify(result));
          }
  
          return res.status(200).json(result).end();
        } else {
          return res.status(200).json({
            state: TickWXResultState.WAITING,
          }).end();
        }

      }
    });

    router.get('/@weixin/signIn/qrcode/:id', (req, res) => {
      const id = req.params.id;

      TickWX.signIn(id).then(text => {
        axios.get(text as string, {
          responseType: 'arraybuffer'
        }).then(result => {
          res.type('png')
            .status(200)
            .send(result.data)
            .end();
        })
      })      
    });

    app.use(router);
  }).start((app: express.Express) => {
    debug('app')(`启动服务成功`)
    if (typeof callback === 'function') {
      callback(app);
    }
  });  
}
