
import Koa from 'koa';
import path from 'path';
import next from 'next';
import fs from 'fs-extra';
import KoaSticic from 'koa-static';
import KoaViews from 'koa-views';
import KoaBodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import debug from 'debug';

import { createServer } from 'vite';

export async function Server (implement) {
  const app = next({ dev: true, dir: __dirname });
  const handle = app.getRequestHandler();

  debug('mini-program:server')(`开始创建服务`);
  
  const server = new Koa();

  // server.use(runtime());
  server.use(KoaBodyParser());
  server.use(KoaViews(path.join(__dirname, 'views'), { extension: 'ejs' }));
  server.use(KoaSticic(path.resolve(__dirname, 'public')));

  const router = new Router();



  router.post('/api/:name', async context => {
    const { name } = context.params;
    await implement(name, context);
  });

  router.get(`/appruntime`, async context => {
    const { __TICK_SERVICE } = context;

    context.body = `import a from '/runtime.js'`;
  });
  
  router.get(`/appservice`, async context => {
    const { __TICK_SERVICE } = context;

    context.type = 'application/javascript';
    context.body = __TICK_SERVICE;
  });

  router.get(`/subpage/appwxss`, async context => {
    const { p, r } = context.request.query;
    const { __TICK_CONTEXT } = context;
    const { project } = __TICK_CONTEXT;

    try {
      const filepath = path.resolve(project, p + 'page-frame.js'); 
      await fs.access(filepath, fs.constants.R_OK);

      context.status = 200;
      context.type = 'application/javascript';
      context.body = await fs.readFile(filepath);

    } catch (error) {
      context.status = 400;
    }
  });

  router.get(`/subpage/appservice`, async context => {
    const { p, r } = context.request.query;
    const { __TICK_CONTEXT } = context;
    const { project } = __TICK_CONTEXT;

    try {
      const filepath = path.resolve(project, p + 'app-service.js');
      await fs.access(filepath, fs.constants.R_OK);

      context.status = 200;
      context.type = 'application/javascript';
      context.body = await fs.readFile(filepath);
    } catch (error) {
      context.status = 400;
    }
  })

  router.get(`/appwxss`, async context => {
    const { __TICK_WXSS } = context;

    context.type = 'application/javascript';
    context.body = __TICK_WXSS;
  });

  server.use(router.routes());
  server.use(router.allowedMethods());
  
  server.use(async ({ req, res, __TICK_CONTEXT }) => {
    req.__TICK_CONTEXT = __TICK_CONTEXT;
    await handle(req, res);
  });

  return app.prepare().then(() => Promise.resolve(server));
}






