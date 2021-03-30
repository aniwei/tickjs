import minimist from 'minimist';
import fs from 'fs-extra';
import path from 'path';
import globby from 'globby';
import { build } from 'esbuild';

import wcc from './wcc';
import wcsc from './wcsc';
import App, { TickMiniHMR } from '../server';
import { defineUserConfig } from '../server';
import { TickMini } from '../server/TickMini';
import { compose, defaultService, TickMiniService } from '../server/TickMiniService';

const argv = minimist(process.argv.slice(2));
const service = new TickMiniService();
const hmr = new TickMiniHMR();
const cwd = process.cwd();

class DevelopApplication {
  public root: string;
  public argv: any;

  constructor (argv: any) {
    this.argv = argv;
    this.root = cwd;
  }

  wcsc (files?: string[]) {
    return (files ? Promise.resolve(files) : globby(['**/*.wxss'], {
      cwd: this.root
    })).then(files => {
      return wcsc({
        files,
        cwd: this.root,
      }).then(res => {
        const contents = [eval(`'${res.comm}'`)];

        for (const file of files) {
          if (res[file]) {
            const content = eval(`'${res[file]}'`);
            contents.push(`__wxAppCode__['${file}'] = ${content}`);
          }
        }

        return contents.join('\n')
      })
    })
  }

  wcc (files?: string[]) {
    return (files ? Promise.resolve(files) : globby(['**/*.wxml'], {
      cwd: this.root
    })).then(files => {
      return wcc({
        files: files.map(files => `./${files}`),
        cwd: this.root,
        debugWXS: false,
        debug: false,
        
      }).then(res => res.toString())
    })
  }

  build (entties, defineContent?) {
    return build({
      watch: true,
      bundle: false,
      write: false,
      define: defineContent || {},
      entryPoints: entties
    }).then(res => {
      const { outputFiles } = res;
      const file = outputFiles[0];
      return Promise.resolve(file.text);
    });
  }

  config () {
    const filepath = path.resolve(this.root, 'app.json');

    return globby(['**/*.json']).then(files => { 
      return fs.readJSON(filepath).then(async json => {
        const config: any = {
          pages: json.pages,
          global: { window: json.window },
          page: {},
        }
  
        if (json.tabBar) {
          config.tabBar = {
            ...json.tabBar,
            list: json.tabBar.list.map(tabItem => {
              return {
                ...tabItem,
                pagePath: tabItem.pagePath + '.html'
              }
            })
          }
        }

        return Promise.resolve(config);
      }).then(config => {
        return Promise.all(config.pages.map(page => {
          return fs.readJSON(page + '.json').then(win => {
            return Promise.resolve([page, win])
          })
        })).then(pages => {
          for (const item of pages) {
            const [page, win] = item as any;
            config.page[`${page}.html`] = { window: win }
          }

          return Promise.resolve(config)
        })
      })
    })
  }

  onRequest = (
    matched: any[], 
    context: TickMini
  ) => {
    const [prefix, filename, query] = matched; 

    console.log(matched)
    
    switch (prefix) {
      case '@proj': {
        switch (filename) {
          case 'context': {
            return this.config().then(config => {
              defineUserConfig({ proj: config });
  
              return Promise.resolve(JSON.stringify({ 
                ...context.config.proj,
                env: context.config.env
              }));
            });
          }

          default: {

          }
        }
      }
  
      case '@app': {
        switch (filename) {
          case 'service': {
            return this.wcc();
          }

          case 'code': {
            return this.build([path.join(cwd, query.r)]);
          }

          case 'import': {
            switch (query.r) {
              case 'dependence': {
                return this.build([path.join(__dirname, 'shim/dependence.js')], {
                  'inject.route': `'${query.r}'`,
                  'inject.file': `'${query.r}.js'`,
                });
              }
              case 'app': {
                return this.build([path.join(__dirname, 'shim/app.js')], {
                  'inject.route': `'${query.r}'`,
                  'inject.file': `'${query.r}.js'`,
                });
              }

              default: {
                return this.build([path.join(__dirname, 'shim/page.js')], {
                  'inject.route': `'${query.r}'`,
                  'inject.file': `'${query.r}.js'`,
                });
              }
                
            }
          }

          case 'wxml': {
            return new Promise((resolve, reject) => {
              const files = [query.r];
              const code: string[] = [];
              
              code.push(`if (__vd_version_info__.delayedGwx) __wxAppCode__['${files[0]}'] = [ $gwx, './${files[0]}' ];else __wxAppCode__['${files[0]}'] = $gwx( './${files[0]}' );`)

              return this.wcc().then(wcc => {
                resolve([`if (import.meta.hot) { import.meta.hot.on('wcc', (data) => { WeixinJSCore.invokeHandler('hotModuleReplacement', { type: 'wcc', data }, 0) })}`,
                  `var __pageFrameStartTime__ = __pageFrameStartTime__ || Date.now();var __webviewId__ = __webviewId__;var __wxAppCode__ = __wxAppCode__ || {};var __mainPageFrameReady__ = window.__mainPageFrameReady__ || function(){};var __WXML_GLOBAL__ = __WXML_GLOBAL__ || {entrys:{},defines:{},modules:{},ops:[],wxs_nf_init:undefined,total_ops:0};var __vd_version_info__=__vd_version_info__||{};`,
                  wcc,
                  ...code
                ].join('\n'));
              })
            })
          }

          case 'wxss': {
            return new Promise((resolve, reject) => {
              const files = [
                query.r,
                'app.wxss'
              ];
              
              return this.wcsc(files).then(wcsc => {
                resolve(wcsc);
              })
            })
          }
        }
      }
    }
  }

  start (proj) {
    hmr.use(/\.wxml$/g, async (matched: any[]) => {
      const [filename, hmr] = matched;

      this.wcc([`./${filename}`]).then(wcc => {
        hmr.server.ws.send({
          type: 'custom',
          event: 'wcc',
          data: {
            filename: filename.replace(/\.wxml$/, ''),
            code: wcc
          }
        })
      });

      return [];
    })

    service.use(/^\/(([^\/]+)\/([^?]+))(\?[^?]+|.*)/g, this.onRequest);

    App(defineUserConfig({
      env: {
        cwd: this.root,
        type: 'develop'
      },
      proj,
      hmr,
      service: compose([service, defaultService]),
    }))
  }
}


const startApplication = async () => {
  const dev = new DevelopApplication({ ...argv, cwd });

  dev.start({
    accountInfo: {
      appId: 'wx3ce645f632f26623',
      icon: 'http://mmbiz.qpic.cn/mmbiz_png/IhibnWnu9biaWTJW5PagGC5j5sk0UKqxyEyXfibdmXJwYEAMUmvOD7KjDM7UtZj6pFHibOSk1An3egDycZbBPPosVw/640?wx_fmt=png&wxfrom=200',
      nickname: 'luckincoffee瑞幸咖啡'
    },
    appLaunchInfo: {
      path: 'pages/index/index',
      query: {},
      scene: 1001,
      shareTicket: null,
      referrerInfo: {
        appid: 'wx3ce645f632f26623'
      },
    },
  });

  return dev;
}

startApplication();