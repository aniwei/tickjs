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
import { TickApp } from './TickApp';


export default async function App (config: TickConfig) {  
  const proj: TickProj = TickProj.sharedProj(config.mini);

  config.plugins = [TickApp(proj)];

  const app: express.Express = await vite(config as ViteOptions);
  const router: express.Router = express.Router();

  await proj.config();
  
  isMiniConfigIllegal(proj.mini as TickMiniConfig);

  router.use('/@tickjs/context', async (req, res) => {
    res.json({
      ...proj.mini,
      config: {
        ...config,
        ...proj.mini.config
      }
    });
  });
  // router.post('/@tickjs/api/')

  app.use(router);
  app.listen(config.port);
}

export {
  defineUserConfig
}