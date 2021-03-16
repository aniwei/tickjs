import express from 'express';

import vite from './vite';
import { TickProj } from './TickProj';
import { 
  defineUserConfig,
  isMiniConfigIllegal,
} from './TickConfig';
import { 
  TickConfig, 
  TickMiniConfig, 
  ViteOptions,
} from '../types';
import { TickTransform } from './TickTransformPlugin';


export default async function App (config: TickConfig) {  
  const proj: TickProj = TickProj.sharedProj(config.mini);

  config.plugins = [TickTransform(proj)];

  const app: express.Express = await vite(config as ViteOptions);
  const router: express.Router = express.Router();

  await proj.config();
  
  isMiniConfigIllegal(proj.mini as TickMiniConfig);

  router.get('/@tickjs/wxservice', async (req, res) => {
    res.type('application/json');
    res.send(await proj.wx(`wxservice.js`));
  });

  router.get('/@tickjs/wxview', async (req, res) => {
    res.type('application/json');
    res.send(await proj.wx(`wxview.js`));
  });

  router.use('/@tickjs/service', async (req, res) => {
    const { r } = req.query;
    res.send(await proj.service(r as string));
  });

  router.use('/@tickjs/context', async (req, res) => {
    res.json({
      ...proj.mini,
      config: {
        ...config,
        ...proj.mini.config
      }
    });
  });

  router.use('/@tickjs/wxss', async (req, res) => {
    const { r } = req.query;
    res.send(await proj.wxss(r as string));
  });

  // router.post('/@tickjs/api/')

  app.use(router);
  app.listen(config.port);
}

export {
  defineUserConfig
}