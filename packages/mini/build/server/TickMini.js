"use strict";
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
exports.TickMini = exports.defineUserConfig = void 0;
// @ts-ignore
const home_dir_1 = __importDefault(require("home-dir"));
const path_1 = require("path");
const events_1 = require("events");
const TickVite_1 = __importDefault(require("./TickVite"));
const TickMiniProjLoader_1 = require("./TickMiniProjLoader");
const TickMiniProjDefaultConfig_1 = require("./TickMiniProjDefaultConfig");
const TickMiniAdapters_1 = require("./TickMiniAdapters");
const TickMiniTransformer_1 = require("./TickMiniTransformer");
const TickMiniService_1 = require("./TickMiniService");
function defineConfig(target, source) {
    if (source) {
        const sourceKeys = Object.keys(source);
        for (const key of sourceKeys) {
            const src = source[key];
            const tar = target[key];
            if (src && typeof src === 'object') {
                if (tar === null || tar === undefined) {
                    target[key] = Array.isArray(src) ? [] : {};
                }
                defineConfig((target)[key], src);
            }
            else {
                target[key] = src;
            }
        }
    }
    return target;
}
const TickMiniDefaultConfig = {
    env: {
        PORT: 3000,
        CLI: false,
        PKG: true,
    },
    root: process.cwd(),
    cache: path_1.join(home_dir_1.default(), '.tickjs'),
    client: path_1.resolve(__dirname, '../../client'),
    proj: TickMiniProjDefaultConfig_1.TickMiniProjDefaultConfig,
    adapters: new TickMiniAdapters_1.DefaultAdapters(),
    transformer: TickMiniTransformer_1.defaultTransformer,
    service: TickMiniService_1.defaultService
};
function defineUserConfig(source) {
    defineConfig(TickMini.config, source);
    return TickMini.config;
}
exports.defineUserConfig = defineUserConfig;
class TickMini extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.app = null;
        this.config = config;
        this.proj = new TickMiniProjLoader_1.TickMiniProjLoader(config.root, config);
    }
    static sharedTickMini(config) {
        if (this.mini) {
            return this.mini;
        }
        return this.mini = new TickMini(config);
    }
    adapte(api, req, res) {
        const { adapters } = this.config;
        if (adapters) {
            if (adapters[api]) {
                return adapters[api](req, res, this.proj);
            }
        }
        res.statusCode = 404;
        res.end();
    }
    prepare(prepareHandler) {
        const { hmr, transformer, service } = this.config;
        process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
            const { port, env, client } = this.config;
            const viteOptions = {
                client: client,
                port: env.PORT || port,
                plugins: [{
                        name: 'tick-service-runtime-plugin',
                        resolveId: (id) => {
                            return id;
                            //return service.match(id, this);
                        },
                        load: (id) => {
                            console.log(id);
                            return service.handle(id, this);
                        },
                        transform: transformer.handle,
                        handleHotUpdate: hmr ? (h) => hmr.handle(h, this) : () => { }
                    }]
            };
            const app = yield TickVite_1.default(viteOptions);
            prepareHandler(app);
            this.emit(`projprepared`, app);
        }));
        return this;
    }
    start(callback) {
        this.once(`projprepared`, (app) => __awaiter(this, void 0, void 0, function* () {
            app.listen(this.config.env.port, callback);
        }));
        return this;
    }
}
exports.TickMini = TickMini;
TickMini.mini = null;
TickMini.config = TickMiniDefaultConfig;
