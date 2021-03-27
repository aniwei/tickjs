import minimist from 'minimist';
// @ts-ignore
import spawn from 'await-spawn';
import fs from 'fs-extra';
import path from 'path';
import globby from 'globby';
import { build } from 'esbuild';


import App from '../server';
import { defineUserConfig } from '../server';
import { TickMini } from '../server/TickMini';
import { compose, defaultService, TickMiniService } from '../server/TickMiniService';

const argv = minimist(process.argv.slice(2));
const service = new TickMiniService();
const cwd = process.cwd();


const startApplication = async () => {
  const wcc = () => {
    return globby(['**/*.wxml'], {
      cwd
    }).then(files => {
      return spawn(path.resolve(__dirname, '../bin/wcc'), [files.join(' ')], {
        cwd
      }).then((res: any) => res.toString())
    });
  }
  
  const wcsc = async () => {
    return await globby(['**/*.wxss'], {
      cwd
    }).then(files => {
      return spawn(path.resolve(__dirname, '../bin/wcsc'), [files.join(' ')], {
        cwd
      })
    });
  }
  
  const PKG = !!argv.pkg;
  const CLI = true;
  const CWD = cwd;

  const esbuild = (entry, define?) => {
    return build({
      watch: true,
      bundle: false,
      write: false,
      define: define || {},
      entryPoints: [entry]
    }).then(res => {
      const { outputFiles } = res;
      const file = outputFiles[0];
      return Promise.resolve(file.text);
    });
  }

  service.use(/^\/(([^\/]+)\/([^?]+))(\?[^?]+|.*)/g, (
    matched: any[], 
    context: TickMini
  ) => {
    const [prefix, filename, query] = matched; 
    
    switch (prefix) {
      case '@proj': {
        switch (filename) {
          case 'context': {
            return fs.readJSON(path.resolve(cwd, 'app.json')).then(config => {
              config.global = { window: config.window }
              config.page = {};
  
              for (const page of config.pages) {
                config.page[`${page}.html`] = {
                  window: {
                    
                  }
                }
              }
  
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
            return wcc();
          }

          case 'code': {
            return esbuild([path.join(cwd, query.r)]);
          }

          case 'import': {
            switch (query.r) {
              case 'dependence': {
                return esbuild([path.join(__dirname, 'shim/dependence.js')], {
                  'inject.route': `'${query.r}'`,
                  'inject.file': `'${query.r}.js'`,
                });
                break;
              }
              case 'app': {
                return esbuild([path.join(__dirname, 'shim/app.js')], {
                  'inject.route': `'${query.r}'`,
                  'inject.file': `'${query.r}.js'`,
                });
              }

              default: {
                return esbuild([path.join(__dirname, 'shim/page.js')], {
                  'inject.route': `'${query.r}'`,
                  'inject.file': `'${query.r}.js'`,
                });
              }
                
            }
          }

          case 'view': {
            return wcsc();
          }
        }
      }
    }
  });


  App(defineUserConfig({
    env: {
      ...process.env,
      CWD,
      CLI,
      PKG,
    },
    proj: {
      accountInfo: {
        appId: 'wx21c7506e98a2fe75',
        icon: 'http://mmbiz.qpic.cn/mmbiz_png/IhibnWnu9biaWTJW5PagGC5j5sk0UKqxyEyXfibdmXJwYEAMUmvOD7KjDM7UtZj6pFHibOSk1An3egDycZbBPPosVw/640?wx_fmt=png&wxfrom=200',
        nickname: 'luckincoffee瑞幸咖啡'
      },
      appLaunchInfo: {
        path: 'pages/index/index',
        query: {},
        scene: 1001,
        shareTicket: null,
        referrerInfo: {
          appid: 'wx21c7506e98a2fe75'
        },
      },
    },
    service: compose([service, defaultService])
  }))
}


startApplication();