import Koa from 'koa';
import path from 'path';
import fs from 'fs-extra';
import kstatic from 'koa-static';
import views from 'koa-views';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';


import * as shared from './shared';
import * as api from './api';

class MiniProgramConfigError extends Error {}

function isIllegalMiniProgramConfig (config) {
  if (config.accountInfo === undefined) {
    throw new MiniProgramConfigError(`缺少账号信息`);
  }

  if (config.appLaunchInfo === undefined) {
    throw new MiniProgramConfigError(`缺少启动信息`);
  }

  if (config.entryPagePath === undefined) {
    throw new MiniProgramConfigError(`缺少入口路由`);
  }
}

export function MiniProgram (options, config) {
  const port = options.port || process.env.PORT || shared.port;
  const cwd = options.cwd || process.cwd();
  const appid = options.appid;

  const device = {
    ...shared.device,
    ...options.device
  }

  const system = {
    ...shared.system,
    ...options.system,
    model: {
      ...shared.system.model,
      ...options.system?.model
    }
  }

  const invokeTypes = {
    ...shared.invokeTypes,
    ...options.invokeTypes
  }

  config = {
    ...shared.config,
    ...config,
  }



  isIllegalMiniProgramConfig(config);

  const app = new Koa();
  const router = new Router();

  app.use(bodyParser());
  app.use(kstatic(path.resolve(__dirname, 'public')));
  app.use(kstatic(path.resolve(cwd, 'public'), { }));
  app.use(views(path.resolve(__dirname, 'views'), {
    map: { hbs: 'handlebars' },
    options: { cache: false }
  }));

  router.get('/', async ({ render }) => {
    await render('index.hbs', { appid })
  });

  router.post('/api/:name', async context => {
    const { name } = context.params;

    if (api[name]) {
      await api[name](context);
    }
  });

  router.get('/generate', async ({ render, query: { route } }) => { 
    await render('generate.hbs', { route, appid });
  });

  
  router.get('/WeixinJSCore', async ({ render, query: { webviewId }}) => {
    await render('WeixinJSCore.hbs', { webviewId, appid })
  });

  router.get('/pages', async ({ render }) => {
    await render('pages.hbs', { appid });
  });

  router.get('/device', async ({ render }) => {
    await render('device.hbs', { device: JSON.stringify(device, null, 2) });
  });

  router.get('/system', async context => {
    await context.render('system.hbs', {
      system: JSON.stringify(system, null, 2),
    })
  });
  
  router.get('/config', async ({ render }) => {  
    await render('config.hbs', {
      config: JSON.stringify({
        ...await fs.readJSON(path.resolve(cwd, 'app-config.json')),
        ...config
      }, null, 2)
    });
  });
  
  router.get('/service', async context => {
    context.body = await fs.readFile(path.resolve(cwd, 'app-service.js'));
  });
  
  router.get('/wxss', async context => {
    context.body = await fs.readFile(path.resolve(cwd, 'app-wxss.js'));
  });
  
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}