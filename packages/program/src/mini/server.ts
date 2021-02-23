import debug from 'debug';
import { EventEmitter } from 'events';
import Router from '@koa/router';
import Koa from 'koa';


const env = process.env;

const app = new Koa();

app.use(async ctx => {
  ctx.type = 'text/html';
  ctx.body = `
    <html>
      <head>
        <script src="/context.js"></script>
        <script src="/config.js"></script>
        <script src="/WAService.js"></script>
      </head>
      <body>
        小程序
      </body>
    </html>
  `
});

app.listen(env.PORT || 3000, () => {
  debug('app')('启动服务');
})
