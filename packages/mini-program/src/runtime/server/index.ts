
import Koa from 'koa';
import path from 'path';
import next from 'next';
import fs from 'fs-extra';
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

  router.get('/tickruntime', async context => {
    const { __TICK_RUNTIME } = context;
    const { r, m } = context.request.query;
    const { 
      appconfig, 
      device, 
      config, 
      system, 
      types 
    } = __TICK_RUNTIME;

    context.type = 'application/javascript';
    context.body = `
      const __TICK_RUNTIME = { 
        mode: '${m || 'RELEASE'}',
        route: '${r === undefined ? null : r}',
        globalThis: this, 
        context: {
          appconfig: ${JSON.stringify(appconfig)},
          device: ${JSON.stringify(device)},
          config: ${JSON.stringify(config)},
          types: ${JSON.stringify(types)},
        },
        nextTick = (callback) => {
          return new Promise((resolve, reject) => {
            if (typeof callback === 'function') {
              callback();
              resolve();
            } else {
              reject(new TypeError('Callback must be function.'));
            }
          });
        },
        debug: (name) => {
          return (...args) => {
            __TICK_RUNTIME.console.info(\`【\${name}】\`, ...args);
          }
        },
        request: (name, body) => {
          return fetch(\`/api/\${name}\`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body
          })
        }
      };

      ${
        r === undefined ? '' : `

        `
      }
      

      __TICK_RUNTIME.WeixinJSCore = {
        dispatchEvent (name, argv) {
          __TICK_RUNTIME.globalThis.dispatchEvent(name, ...argv);
        },

        invokeHandler (name, options, callbackId) {
          __TICK_RUNTIME.debug(\`invokeHandler\`)(
            \`数据:\`, data,
            \`回调函数:\`, callbackId
          );

          this.dispatchEvent(name, [options, callbackId]);
        },

        publishHandler (name, data, webviewId) {
          __TICK_RUNTIME.debug(\`publishHandler\`)(
            \`数据:\`, data,
            \`WebViewId:\`, webviewId
          );

          const options = { nativeTime: Date.now() };

          ${
            r !== undefined ? `if (name === 'custom_event_webViewCreated') {
              this.dispatchEvent('created', {}, options);
            }` : `
              const json = JSON.parse(data);

              const webviewIds = name === 'custom_event_onAppRoute' ? 
                JSON.parse(webviewId) : [json.data.webviewid];

              for (const webviewId of webviewIds) {
                this.dispatchEvent(name, [
                  name, 
                  json,
                  0,
                  options,
                  webviewId
                ]);
              }
            `
          }
        }
      }
    }

    __TICK_RUNTIME.init = () => {
      __TICK_RUNTIME.globalThis.addEventListener('message', () => {

      });
    }

    __TICK_RUNTIME.init = ()
    `
  });

  router.post('/api/:name', async context => {
    const { name } = context.params;
    await implement(name, context);
  });
  
  router.get(`/appservice`, async context => {
    const { __TICK_APP_SERVICE } = context;

    context.type = 'application/javascript';
    context.body = __TICK_APP_SERVICE;
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
    const { __TICK_APP_WXSS } = context;

    context.type = 'application/javascript';
    context.body = __TICK_APP_WXSS;
  });

  server.use(router.routes());
  server.use(router.allowedMethods());
  
  server.use(async ({ req, res, __TICK_RUNTIME }) => {
    req.__TICK_RUNTIME = __TICK_RUNTIME;
    await handle(req, res);
  });

  return app.prepare().then(() => Promise.resolve(server));
}






