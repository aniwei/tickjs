import express from 'express';
import { ViteDevServer } from 'vite';

import vite from './vite';

export default async function app (options?: any) {
  const app: express.Express = await vite(options);

  const router: express.Router = express.Router();

  router.use('/@tickjs/context', (req, res) => {
    res.json({
      appconfig: {},
      device: {},
      system: {},
      types: []
    })
  });

  app.use(router);
  app.listen(options.port);
}

app({ port: 3000 });