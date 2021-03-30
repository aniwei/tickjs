"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.defineUserConfig = void 0;
const express_1 = __importDefault(require("express"));
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const TickMini_1 = require("./TickMini");
const TickWX_1 = require("./TickWX");
var TickMini_2 = require("./TickMini");
Object.defineProperty(exports, "defineUserConfig", { enumerable: true, get: function () { return TickMini_2.defineUserConfig; } });
__exportStar(require("./TickMiniTransformer"), exports);
__exportStar(require("./TickMiniService"), exports);
__exportStar(require("./TickMiniHMR"), exports);
class TickMiniConfigError extends Error {
}
function isMiniConfigIllegal(config) {
    const { proj } = config;
    if (proj.accountInfo === undefined ||
        proj.accountInfo === null) {
        throw new TickMiniConfigError(`Missing account information`);
    }
    else if (proj.appLaunchInfo === undefined ||
        proj.appLaunchInfo === null) {
        throw new TickMiniConfigError(`Missing app luanch information`);
    }
}
function App(config, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        isMiniConfigIllegal(config);
        debug_1.default('app')(`正在检测配置是否正确`);
        const mini = TickMini_1.TickMini.sharedTickMini(config);
        return mini.prepare((app) => {
            debug_1.default('app')(`已经启动服务，并注册主要中间件`);
            const router = express_1.default.Router();
            router.use(express_1.default.static(path_1.default.resolve(__dirname, '../../node_modules')));
            router.post('/@weixin/api/:api(*)', [
                body_parser_1.default.json(),
                body_parser_1.default.urlencoded()
            ], (req, res) => __awaiter(this, void 0, void 0, function* () {
                const { headers } = req;
                const api = headers['x-api'];
                mini.adapte(api, req, res);
            }));
            router.get('/@weixin/icon', (req, res) => {
                res.statusCode = 200;
                axios_1.default.get(mini.config.proj.accountInfo.icon, {
                    responseType: 'arraybuffer'
                }).then(result => {
                    res.statusCode = 200;
                    res.type('png').send(result.data).end();
                });
            });
            router.get('/@weixin/name', (req, res) => {
                res.statusCode = 200;
                res.statusCode = 200;
                res.json({
                    name: mini.config.proj.accountInfo.nickname
                }).end();
            });
            router.get('/@weixin/signIn/polling/:id', (req, res) => {
                const authorizion = mini.proj.storage.getItem(`@weixin:authorizion`);
                if (authorizion) {
                    res.status(200)
                        .json(JSON.parse(authorizion))
                        .end();
                }
                else {
                    const result = TickWX_1.TickWX.results.get(req.params.id);
                    if (result) {
                        if (result.state === TickWX_1.TickWXResultState.SUCCESS) {
                            mini.proj.storage.setItem(`@weixin:authorizion`, JSON.stringify(result));
                        }
                        return res.status(200).json(result).end();
                    }
                    else {
                        return res.status(200).json({
                            state: TickWX_1.TickWXResultState.WAITING,
                        }).end();
                    }
                }
            });
            router.get('/@weixin/signIn/qrcode/:id', (req, res) => {
                const id = req.params.id;
                mini.proj.weixin.signIn(id).then(text => {
                    axios_1.default.get(text, {
                        responseType: 'arraybuffer'
                    }).then(result => {
                        res.type('png')
                            .status(200)
                            .send(result.data)
                            .end();
                    });
                });
            });
            app.use(router);
        }).start((app) => {
            debug_1.default('app')(`启动服务成功`);
            if (typeof callback === 'function') {
                callback(app);
            }
        });
    });
}
exports.default = App;
