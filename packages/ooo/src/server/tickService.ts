import Koa from 'koa';
import KoaSticic from 'koa-static';
import KoaBody from 'koa-body';
import Router from 'koa-router';

import { resolve } from 'path';
import { ViteDevServer } from 'vite';

export default function tickService () {
  const server = new Koa();
  const router = new Router();  

  server.use(KoaBody());
  server.use(KoaSticic(resolve(__dirname, 'views')));
  server.use(router.routes());
  server.use(router.allowedMethods());

  const callback = server.callback();

  return {
    name: 'tick-service',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(callback);
    }
  }
}



