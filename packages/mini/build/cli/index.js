"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const globby_1 = __importDefault(require("globby"));
const esbuild_1 = require("esbuild");
const wcc_1 = __importDefault(require("./wcc"));
const wcsc_1 = __importDefault(require("./wcsc"));
const server_1 = __importStar(require("../server"));
const server_2 = require("../server");
const TickMiniService_1 = require("../server/TickMiniService");
const argv = minimist_1.default(process.argv.slice(2));
const service = new TickMiniService_1.TickMiniService();
const hmr = new server_1.TickMiniHMR();
const cwd = process.cwd();
class DevelopApplication {
    constructor(argv) {
        this.onRequest = (matched, context) => {
            const [prefix, filename, query] = matched;
            switch (prefix) {
                case '@proj': {
                    switch (filename) {
                        case 'context': {
                            return this.config().then(config => {
                                server_2.defineUserConfig({ proj: config });
                                return Promise.resolve(JSON.stringify(Object.assign(Object.assign({}, context.config.proj), { env: context.config.env })));
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
                            return this.build([path_1.default.join(cwd, query.r)]);
                        }
                        case 'import': {
                            switch (query.r) {
                                case 'dependence': {
                                    return this.build([path_1.default.join(__dirname, 'shim/dependence.js')], {
                                        'inject.route': `'${query.r}'`,
                                        'inject.file': `'${query.r}.js'`,
                                    });
                                }
                                case 'app': {
                                    return this.build([path_1.default.join(__dirname, 'shim/app.js')], {
                                        'inject.route': `'${query.r}'`,
                                        'inject.file': `'${query.r}.js'`,
                                    });
                                }
                                default: {
                                    return this.build([path_1.default.join(__dirname, 'shim/page.js')], {
                                        'inject.route': `'${query.r}'`,
                                        'inject.file': `'${query.r}.js'`,
                                    });
                                }
                            }
                        }
                        case 'wxml': {
                            return new Promise((resolve, reject) => {
                                const files = [query.r];
                                const code = [];
                                code.push(`if (__vd_version_info__.delayedGwx) __wxAppCode__['${files[0]}'] = [ $gwx, './${files[0]}' ];else __wxAppCode__['${files[0]}'] = $gwx( './${files[0]}' );`);
                                return this.wcc().then(wcc => {
                                    resolve([`if (import.meta.hot) { import.meta.hot.on('wcc', (data) => { WeixinJSCore.invokeHandler('hotModuleReplacement', { type: 'wcc', data }, 0) })}`,
                                        `var __pageFrameStartTime__ = __pageFrameStartTime__ || Date.now();var __webviewId__ = __webviewId__;var __wxAppCode__ = __wxAppCode__ || {};var __mainPageFrameReady__ = window.__mainPageFrameReady__ || function(){};var __WXML_GLOBAL__ = __WXML_GLOBAL__ || {entrys:{},defines:{},modules:{},ops:[],wxs_nf_init:undefined,total_ops:0};var __vd_version_info__=__vd_version_info__||{};`,
                                        wcc,
                                        ...code
                                    ].join('\n'));
                                });
                            });
                        }
                        case 'wxss': {
                            return new Promise((resolve, reject) => {
                                const files = [
                                    query.r,
                                    'app.wxss'
                                ];
                                return this.wcsc(files).then(wcsc => {
                                    resolve(wcsc);
                                });
                            });
                        }
                    }
                }
            }
        };
        this.argv = argv;
        this.root = cwd;
    }
    wcsc(files) {
        return (files ? Promise.resolve(files) : globby_1.default(['**/*.wxss'], {
            cwd: this.root
        })).then(files => {
            return wcsc_1.default({
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
                return contents.join('\n');
            });
        });
    }
    wcc(files) {
        return (files ? Promise.resolve(files) : globby_1.default(['**/*.wxml'], {
            cwd: this.root
        })).then(files => {
            return wcc_1.default({
                files: files.map(files => `./${files}`),
                cwd: this.root,
                debugWXS: false,
                debug: false,
            }).then(res => res.toString());
        });
    }
    build(entties, defineContent) {
        return esbuild_1.build({
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
    config() {
        const filepath = path_1.default.resolve(this.root, 'app.json');
        return globby_1.default(['**/*.json']).then(files => {
            return fs_extra_1.default.readJSON(filepath).then((json) => __awaiter(this, void 0, void 0, function* () {
                const config = {
                    pages: json.pages,
                    global: { window: json.window },
                    page: {},
                };
                if (json.tabBar) {
                    config.tabBar = Object.assign(Object.assign({}, json.tabBar), { list: json.tabBar.list.map(tabItem => {
                            return Object.assign(Object.assign({}, tabItem), { pagePath: tabItem.pagePath + '.html' });
                        }) });
                }
                return Promise.resolve(config);
            })).then(config => {
                return Promise.all(config.pages.map(page => {
                    return fs_extra_1.default.readJSON(page + '.json').then(win => {
                        return Promise.resolve([page, win]);
                    });
                })).then(pages => {
                    for (const item of pages) {
                        const [page, win] = item;
                        config.page[`${page}.html`] = { window: win };
                    }
                    return Promise.resolve(config);
                });
            });
        });
    }
    start(proj) {
        hmr.use(/\.wxml$/g, (matched) => __awaiter(this, void 0, void 0, function* () {
            const [filename, hmr] = matched;
            this.wcc([`${filename}`]).then(wcc => {
                hmr.server.ws.send({
                    type: 'custom',
                    event: 'wcc',
                    data: {
                        filename: filename.replace(/\.wxml$/, ''),
                        code: wcc
                    }
                });
            });
            return [];
        }));
        service.use(/^\/(([^\/]+)\/([^?]+))(\?[^?]+|.*)/g, this.onRequest);
        server_1.default(server_2.defineUserConfig({
            env: {
                cwd: this.root,
                type: 'develop'
            },
            proj,
            hmr,
            service: TickMiniService_1.compose([service, TickMiniService_1.defaultService]),
        }));
    }
}
const startApplication = () => __awaiter(void 0, void 0, void 0, function* () {
    const dev = new DevelopApplication(Object.assign(Object.assign({}, argv), { cwd }));
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
});
startApplication();
