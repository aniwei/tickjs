import express from 'express';
import ReactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { 
  createServer, 
  ViteDevServer, 
  defineConfig,
  Plugin
} from './vite';

export type ViteServerOptions = {
  port: number,
  cwd?: string,
  client?: string,
  proj?: string,
  plugins?: any[],
  alias?: {
    [key: string]: string
  }
}

export default async function TickVite (
  options: ViteServerOptions
): Promise<express.Express> {
  const plugins: Plugin[] = [
    ReactRefresh(),
    ...(options.plugins || []),
  ];

  const alias = {
    'react-native': 'react-native-web',
    ...options.alias
  }

  const config = defineConfig({
    root: options.client,
    proj: options.proj || process.cwd(),
    plugins,
    resolve: {
      alias
    }
  })

  options.cwd = options.cwd || process.cwd();

  const app: express.Express | any = express(); 
  
  app.listen = async (port: number) => {
    const vite: ViteDevServer | any = await createServer({ 
      ...config, 
      server: { 
        port: options.port,
        watch: {
          cwd: options.cwd
        }
      }
    });

    app.vite = vite;

    const viteHandle = vite.middlewares.handle.bind(vite.middlewares);
    vite.middlewares.handle = app.handle.bind(app);


    app.use((
      req: express.Request, 
      res: express.Response, 
      next: express.NextFunction
    ) => {
      viteHandle(req, res, next)
    });

    vite.listen(port);
  };

  return app;
}
