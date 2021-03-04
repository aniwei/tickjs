
import Koa from 'koa';
import fs from 'fs-extra';
import path from 'path';
import next from 'next';
import KoaSticic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import views from 'koa-views';
import Router from 'koa-router';
import debug from 'debug';

export async function Server () {
  const app = next({ dev: true, dir: __dirname });
  const handle = app.getRequestHandler();

  debug('mini-program:server')(`开始创建服务`);
  
  const server = new Koa();
  server.use(bodyParser());
  server.use(KoaSticic(path.resolve(__dirname, 'public')));
  server.use(views(path.resolve(__dirname, 'views'), {
    map: { hbs: 'handlebars' },
    options: { cache: false }
  }));

  const router = new Router();
  
  router.get(`/uiservice`, async context => {
    context.type = 'application/javascript';
    await context.render('uiservice.hbs', {
      service: String(await fs.readFile(path.resolve(__dirname, 'public/WAService.js'))),
    });
  });

  router.get(`/uiwebview`, async context => {
    context.type = 'application/javascript';
    await context.render('uiwebview.hbs', {
    });
  });

  server.use(router.routes());
  server.use(router.allowedMethods());
  
  server.use(async ({ req, res, __TICK_MINI_PROGRAM }) => {
    req.__TICK_MINI_PROGRAM = __TICK_MINI_PROGRAM;
    await handle(req, res);
  });

  return app.prepare().then(() => Promise.resolve(server));
}






