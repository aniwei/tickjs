
import Koa from 'koa';
import path from 'path';
import next from 'next';
import fs from 'fs-extra';
import KoaSticic from 'koa-static';
import KoaViews from 'koa-views';
import KoaBodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import debug from 'debug';



export async function Server (implement) {
  const app = next({ dev: true, dir: __dirname });
  const handle = app.getRequestHandler();

  debug('mini-program:server')(`开始创建服务`);
  
  const server = new Koa();
  server.use(KoaBodyParser());
  server.use(KoaViews(path.join(__dirname, 'views'), { extension: 'ejs' }));
  server.use(KoaSticic(path.resolve(__dirname, 'public')));

  const router = new Router();


  router.get('/appruntime', async context => {
    const { __TICK_RUNTIME } = context;
    const { appconfig, config, device, system, types } = __TICK_RUNTIME;

    context.type = 'application/javascript';
    await context.render('appruntime', {
      __TICK_CONTEXT: JSON.stringify({
        appconfig, config, device, system, types
      })
    })
  })

  router.post('/api/:name', async context => {
    const { name } = context.params;
    await implement(name, context);
  });
  
  router.get(`/appservice`, async context => {
    const { __TICK_SERVICE } = context;

    context.type = 'application/javascript';
    context.body = __TICK_SERVICE;
  });

  router.get(`/subpage/appwxss`, async context => {
    const { p, r } = context.request.query;
    const { __TICK_RUNTIME } = context;
    const { project } = __TICK_RUNTIME;

    try {
      await fs.access(path.resolve(project, p + 'page-frame.js'), fs.constants.R_OK);

      context.status = 200;
      context.type = 'application/javascript';
      context.body = await fs.readFile(path.resolve(project, p + 'page-frame.js'));
    } catch (error) {
      context.status = 400;
    }
  });

  router.get(`/subpage/appservice`, async context => {
    const { p, r } = context.request.query;
    const { __TICK_RUNTIME } = context;
    const { project } = __TICK_RUNTIME;

    try {
      await fs.access(path.resolve(project, p + 'app-service.js'), fs.constants.R_OK);

      context.status = 200;
      context.type = 'application/javascript';
      context.body = await fs.readFile(path.resolve(project, p + 'app-service.js'));
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
  
  server.use(async ({ req, res, __TICK_RUNTIME }) => {
    req.__TICK_RUNTIME = __TICK_RUNTIME;
    await handle(req, res);
  });

  return app.prepare().then(() => Promise.resolve(server));
}






