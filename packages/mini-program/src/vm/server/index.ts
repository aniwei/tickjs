
import Koa from 'koa';
import fs from 'fs-extra';
import path from 'path';
import next from 'next';
import KoaSticic from 'koa-static';
import bodyParser from 'koa-bodyparser';
import views from 'koa-views';
import Router from 'koa-router';
import debug from 'debug';

export function Server () {
  const app = next({ dev: true, dir: __dirname });
  const handle = app.getRequestHandler();
  
  app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    // router.get(`/context`, async context => {
    //   await context.render('context.hbs', {

    //   })
    // });

    router.get(`/config`, async context => {
      console.log(123)
      context.body = {
        code: null,
      };
    });

    router.get(`/uiservice`, async context => {
      await context.render('uiservice.hbs', {
        javascript: await fs.readFile(path.resolve(__dirname, './public/WAService.js'))
      });
    });
  
    server.use(bodyParser());
    server.use(KoaSticic(path.resolve(__dirname, 'public')));
    server.use(views(path.resolve(__dirname, 'views'), {
      map: { hbs: 'handlebars' },
      options: { cache: false }
    }));

    server.use(router.routes());
    server.use(router.allowedMethods());
    
    server.use(async (ctx, next) => {
      await handle(ctx.req, ctx.res)
    });

    server.listen(3000)
  });

  return app;
}


Server();





