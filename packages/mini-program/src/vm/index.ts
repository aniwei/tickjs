import Koa from 'koa'
import debug from 'debug';
import path from 'path';
import fs from 'fs-extra';
import kstatic from 'koa-static';
import views from 'koa-views';
import Router from 'koa-router';

const port = process.env.PORT || 3001

const app = new Koa();
const router = new Router();

router.get('/:appid', async context => {
  const { appid } = context.params;

  await context.render('index.hbs', {
    appid
  });
});

router.get('/:appid/pages', async context => {
  const { appid } = context.params;

  await context.render('pages.hbs', {
    appid
  });
});

router.get('/:appid/system', async context => {
  context.type = 'text/plain';

  await context.render('system.hbs', {
    system: JSON.stringify({
      networkType: 'wifi',
      model: {
        safeArea: {
          bottom: 782,
          height: 782,
          top: 0,
          width: 414,
          left: 0,
          right: 414
        },
        system: 'macOS 10.15.7',
        version: '7.0.8',
        brand: 'MacBookPro16,1',
        windowHeight: 782,
        pixelRatio: 2,
        platform: 'mac',
        screenHeight: 896,
        language: 'zh_CN',
        power: 100,
        statusBarHeight: 22,
        deviceOrientation: 'portrait',
        windowWidth: 414,
        model: 'MacBookPro16,1',
        screenWidth: 414,
        fontSizeSetting: 16
      }
    }, null, 2),
  })
});

router.get('/:appid/config', async context => {
  const { appid } = context.params;

  const config = {
    platform: 'mac',
    appType: 0,
    networkTimeout: {
      request: 60000,
      uploadFile: 60000,
      connectSocket: 60000,
      downloadFile: 60000,
    },
    extAppid: '',
    accountInfo: {
      appId: 'wx42c1491feb6d12a1',
      icon: 'https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png',
      nickname: '亚朵ATOUR'
    },
    deprecated: false,
    env: {
      USER_DATA_PATH: '/Users/weiyanhai/.tick/program'
    },
    appLaunchInfo: {
      path: 'pages/order/orderList/orderList',
      query: {
        scene: '',
        shareCode: 'LKYP_91959434850184',
        type: '1',
        suid: '2d444f77-cf85-438e-8369-175cea90aa5b',
        ic: '8SZS84AB'
      },
      scene: 1001,
      shareTicket: null,
      referrerInfo: {
        appid: 'wx42c1491feb6d12a1'
      },
    },
    ext: {},
    wxAppInfo: {
      maxRequestConcurrent: 10,
      maxUploadConcurrent: 10,
      maxDownloadConcurrent: 10,
      maxWorkerConcurrent: 1,
      maxWebsocketConnect: 2,
    },
    debug: true,
    entryPagePath: 'pages/index/index.html',
    envVersion: 'release',
  }

  context.type = 'text/plain';
  await context.render('config.hbs', {
    config: JSON.stringify({
      ...await fs.readJSON(path.resolve(__dirname, '../../__test__/app-config.json')),
      ...config
    }, null, 2)
  });
});

router.get('/:appid/service', async context => {
  context.type = 'text/plain';
  context.body = await fs.readFile(path.resolve(__dirname, '../../__test__/app-service.js'));
});

router.get('/:appid/wxss', async context => {
  context.type = 'text/plain';
  context.body = await fs.readFile(path.resolve(__dirname, '../../__test__/app-wxss.js'));
});

app.use(kstatic(path.resolve(__dirname, 'public')));
app.use(views(path.resolve(__dirname, 'views'), {
  map: { hbs: 'handlebars' },
  options: {
    cache: false,
  }
}));

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port, () => {
  debug(`vm`)(`服务器启动，端口：%s`, port);
})

