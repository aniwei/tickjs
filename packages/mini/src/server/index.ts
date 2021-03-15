import express from 'express';
import { resolve } from 'path';

import vite from './vite';
import { TickProj } from './TickProj';
import { TickConfig, TickMini, defineUserConfig } from './tick.config';


class TickMiniConfigError extends Error {}

function isMiniConfigIllegal (mini: TickMini) {
  if (
    mini.config.accountInfo === undefined ||
    mini.config.accountInfo === null
  ) {
    throw new TickMiniConfigError(`Missing account information`);
  } else if (
    mini.config.appLaunchInfo === undefined ||
    mini.config.appLaunchInfo === null
  ) {
    throw new TickMiniConfigError(`Missing app luanch information`);
  } else if (
    mini.config.entryPagePath === undefined ||
    mini.config.entryPagePath === null ||
    mini.config.entryPagePath === ''
  ) {
    throw new TickMiniConfigError(`Missing entry page path`);
  }
}

export default async function App (config: TickConfig) {
  isMiniConfigIllegal(config.mini);

  const proj: TickProj = await TickProj.sharedProj(config.mini);
  const app: express.Express = await vite(config);
  const router: express.Router = express.Router();

  router.get('/@tickjs/WAService', async (req, res) => {
    res.type('application/script');
    res.send(await TickProj.import(resolve(__dirname, 'libs/WAService.js')));
  });

  router.get('/@tickjs/WAWebview', async (req, res) => {
    res.type('application/script');
    res.send(await TickProj.import(resolve(__dirname, 'libs/WAWebview.js')));
  });


  router.get('/@tickjs/proj/appservice', async (req, res) => {
    res.type('application/script');
    res.send(await TickProj.import(resolve(__dirname, 'libs/WAWebview.js')));
  });

  app.use(router);
  app.listen(config.port);
}

export {
  defineUserConfig
}