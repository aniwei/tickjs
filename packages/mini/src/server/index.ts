import express from 'express';
import { resolve } from 'path';

import vite from './vite';
import { TickProj } from './TickProj';
import { 
  defineUserConfig,
  isMiniConfigIllegal,
} from './TickConfig';
import { 
  TickConfig, 
  TickMiniConfig, 
} from '../types';


export default async function App (config: TickConfig) {  
  const proj: TickProj = TickProj.sharedProj(config.mini);

  const app: express.Express = await vite(config);
  const router: express.Router = express.Router();

  await proj.importConfig();
  
  isMiniConfigIllegal(proj.mini as TickMiniConfig);

  router.get('/@tickjs/WAService', async (req, res) => {
    res.type('application/script');
    res.send(await TickProj.import(resolve(__dirname, 'libs/WAService.js')));
  });

  router.get('/@tickjs/WAWebview', async (req, res) => {
    res.type('application/script');
    res.send(await TickProj.import(resolve(__dirname, 'libs/WAWebview.js')));
  });

  router.use('/@tickjs/context', (req, res) => {
    res.type('application/script');
    res.send(`export default ${JSON.stringify(proj.mini)}`);
  });

  router.use('/@tickjs/context.ts', (req, res) => {
    res.type('application/script');
    res.send(`export default ${JSON.stringify(proj.mini)}`);
  });

  router.use('/@tickjs/service', async (req, res) => {
    const { r } = req.query;
    res.json(await proj.service(r as string));
  });

  router.use('/@tickjs/wxss', async (req, res) => {
    const { r } = req.query;
    res.json(await proj.wxss(r as string));
  });

  app.use(router);
  app.listen(config.port);
}

export {
  defineUserConfig
}