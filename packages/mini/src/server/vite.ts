import express from 'express';
import { createServer, ViteDevServer } from 'vite';

import config from './vite.config';

export default async function vite (options?: any): Promise<express.Express> {
  const app: express.Express | any = express(); 
  
  const vite: ViteDevServer | any = await createServer({ 
    ...config, 
    server: {
      port: options.port
    }
  });

  const viteMiddlewaresHandle = vite.middlewares.handle.bind(vite.middlewares);
  vite.middlewares.handle = app.handle.bind(app);
  
  app.listen = (port: number) => {
    app.use((
      req: express.Request, 
      res: express.Response, 
      next: express.NextFunction
    ) => {
      viteMiddlewaresHandle(req, res, next)
    });

    vite.listen(port);
  };

  return app;
}
