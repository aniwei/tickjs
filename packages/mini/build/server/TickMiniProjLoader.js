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
exports.TickMiniProjLoader = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const node_localstorage_1 = require("node-localstorage");
const TickWX_1 = require("./TickWX");
class TickMiniProjLoader {
    constructor(root = process.cwd(), config) {
        const { proj } = config;
        this.weixin = new TickWX_1.TickWX(this);
        this.root = root;
        this.storage = new node_localstorage_1.LocalStorage(path_1.default.join(config.cache, proj.accountInfo.appId));
        this.account = proj.accountInfo;
        this._config = config;
    }
    import(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsed = path_1.default.parse(src);
            switch (parsed.ext) {
                case '.js':
                case '.ts':
                case '.esm':
                    return fs_extra_1.default.readFile(src);
                case '.json':
                    return fs_extra_1.default.readJson(src);
            }
        });
    }
    wx(filename) {
        return this.import(path_1.default.resolve(__dirname, `@weixin/${filename}`))
            .then(res => res.toString());
    }
    resolve(filename) {
        return path_1.default.resolve(this.root, filename);
    }
    config() {
        return this.import(this.resolve('app-config.json'));
    }
    view(r) {
        const filename = r ? this.resolve(r + 'app-frame.js') : 'app-wxss.js';
        return this.import(filename)
            .then(res => res.toString());
    }
    code(r) {
        const filename = r ? this.resolve(r + 'app-service.js') : 'app-service.js';
        return this.import(filename)
            .then(res => res.toString());
    }
}
exports.TickMiniProjLoader = TickMiniProjLoader;
