import Koa from 'koa';
import KoaSticic from 'koa-static';
import KoaBody from 'koa-body';
import Router from 'koa-router';
import { createServer } from 'vite';

import { resolve } from 'path';

import config from './config';

export async function Server () {
  const server = new Koa();
  server.use(KoaBody());
  server.use(KoaSticic(resolve(__dirname, 'views')));

  const vite = await createServer({
    ...config,
    server: { middlewareMode: true }
  })

  const router = new Router();

  server.use(router.routes());
  server.use(router.allowedMethods());
  server.use((context, next) => {
    vite.middlewares(context.req, context.res, next);
  });

  server.listen(3000)

  return server;
}


Server();

