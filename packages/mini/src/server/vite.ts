import express from 'express';
import ReactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { 
  createServer, 
  ViteDevServer, 
  defineConfig,
  Plugin
} from 'vite';
import { ViteOptions } from '../types';

export default async function vite (options: ViteOptions): Promise<express.Express> {
  const plugins: Plugin[] = [
    ReactRefresh(),
    ...(options.plugins || []),
  ];

  const alias = {
    'react-native': 'react-native-web',
    ...options.alias
  }

  const config = defineConfig({
    root: resolve(__dirname, 'views'),
    plugins,
    resolve: {
      alias
    }
  })

  const app: express.Express | any = express(); 
  
  app.listen = async (port: number) => {
    const vite: ViteDevServer | any = await createServer({ 
      ...config, 
      server: { port: options.port }
    });

    app.vite = vite;

    const viteMiddlewaresHandle = vite.middlewares.handle.bind(vite.middlewares);
    vite.middlewares.handle = app.handle.bind(app);


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
