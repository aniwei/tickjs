
import Koa from 'koa';
import path from 'path';
import next from 'next';
import KoaSticic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import debug from 'debug';

export async function Server (implement) {
  const app = next({ dev: true, dir: __dirname });
  const handle = app.getRequestHandler();

  debug('mini-program:server')(`开始创建服务`);
  
  const server = new Koa();
  server.use(bodyParser());
  server.use(KoaSticic(path.resolve(__dirname, 'public')));

  const router = new Router();

  router.post('/api/:name', async context => {
    const { name } = context.params;
    await implement(name, context);
  });
  
  router.get(`/appservice`, async context => {
    const { __TICK_APP_SERVICE } = context;

    context.type = 'application/javascript';
    context.body = __TICK_APP_SERVICE;
  });

  router.get(`/appwxss`, async context => {
    const { __TICK_APP_WXSS } = context;

    context.type = 'application/javascript';
    context.body = __TICK_APP_WXSS;
  });

  server.use(router.routes());
  server.use(router.allowedMethods());
  
  server.use(async ({ req, res, __TICK_MINI_PROGRAM }) => {
    req.__TICK_MINI_PROGRAM = __TICK_MINI_PROGRAM;
    await handle(req, res);
  });

  return app.prepare().then(() => Promise.resolve(server));
}






