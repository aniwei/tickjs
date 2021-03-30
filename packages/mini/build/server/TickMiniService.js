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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultService = exports.compose = exports.TickMiniService = void 0;
const qs_1 = __importDefault(require("qs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
// @ts-ignore
const regexp_clone_1 = __importDefault(require("regexp-clone"));
const esbuild = __importStar(require("esbuild"));
const path_1 = require("path");
const TickMini_1 = require("./TickMini");
function defaultMiddle() { }
class TickMiniService {
    constructor() {
        this.middlewares = [];
        this.handle = (id, context) => {
            const index = id.indexOf(context.config.client);
            const newId = index === 0 ? id.slice(context.config.client.length) : id;
            return new Promise((resolve, reject) => {
                const dispatch = (index) => {
                    const mid = this.middlewares[index];
                    if (mid === undefined) {
                        resolve(null);
                    }
                    else {
                        const { path, middle, handle } = mid;
                        mid.path = regexp_clone_1.default(path);
                        const matched = path.exec(newId);
                        if (matched === null) {
                            dispatch(index + 1);
                        }
                        else {
                            const query = /^\?/.test(matched[4]) ?
                                qs_1.default.parse(matched[4].slice(1)) : {};
                            const newMatched = [matched[2], matched[3], query];
                            Promise.resolve(middle(newMatched, context))
                                .then((content) => handle(newMatched, context, content))
                                .then(res => {
                                if (res === undefined) {
                                    dispatch(index + 1);
                                }
                                else {
                                    resolve(res);
                                }
                            });
                        }
                    }
                };
                dispatch(0);
            });
        };
    }
    use(path, middle, handle) {
        if (handle === undefined) {
            handle = middle;
            middle = defaultMiddle;
        }
        this.middlewares.push({
            path,
            handle,
            middle
        });
        return this;
    }
    match(id, context) {
        const index = id.indexOf(context.config.client);
        const newId = index === 0 ? id.slice(context.config.client.length) : id;
        for (const middle of this.middlewares) {
            const { path } = middle;
            if (regexp_clone_1.default(path).test(newId)) {
                return id;
            }
        }
        return null;
    }
}
exports.TickMiniService = TickMiniService;
function compose(services) {
    const service = new TickMiniService();
    for (const serv of services) {
        for (const mid of serv.middlewares) {
            service.use(mid.path, mid.middle, mid.handle);
        }
    }
    return service;
}
exports.compose = compose;
exports.defaultService = new TickMiniService();
exports.defaultService.use(/^\/(([^\/]+)\/([^?]+))(\?[^?]+|.*)/g, (matched, context) => {
    const [prefix, filename, query] = matched;
    if (prefix === '@tickjs') {
        if (filename === 'service.ts') {
            matched[1] = `service.js`;
            return esbuild.build({
                bundle: true,
                write: false,
                watch: true,
                entryPoints: [
                    path_1.join(context.config.client, '@tickjs', 'service.ts')
                ]
            }).then(res => {
                const { outputFiles } = res;
                const file = outputFiles[0];
                return file.text;
            });
        }
    }
}, (matched, context, content) => {
    const [prefix, filename, query] = matched;
    switch (prefix) {
        case '@proj': {
            switch (filename) {
                case 'context': {
                    return context.proj.config().then(config => {
                        TickMini_1.defineUserConfig({ proj: config });
                        return Promise.resolve(JSON.stringify(Object.assign(Object.assign({}, context.config.proj), { env: context.config.env })));
                    });
                }
            }
        }
        case '@weixin':
        case '@tickjs': {
            if (content) {
                return content;
            }
            switch (filename) {
                default: {
                    const file = path_1.join(context.config.client, `${prefix}/${filename}`);
                    return fs_extra_1.default.readFile(file).then(res => res.toString());
                }
            }
        }
        case '@app': {
            switch (filename) {
                case 'service':
                    return context.proj.code();
                case 'view':
                    return context.proj.view();
            }
        }
    }
});
