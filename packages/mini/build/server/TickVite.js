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
const express_1 = __importDefault(require("express"));
const plugin_react_refresh_1 = __importDefault(require("@vitejs/plugin-react-refresh"));
const vite_1 = require("./vite");
function TickVite(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const plugins = [
            plugin_react_refresh_1.default(),
            ...(options.plugins || []),
        ];
        const alias = Object.assign({ 'react-native': 'react-native-web' }, options.alias);
        const config = vite_1.defineConfig({
            root: options.client,
            proj: options.proj || process.cwd(),
            plugins,
            resolve: {
                alias
            }
        });
        options.cwd = options.cwd || process.cwd();
        const app = express_1.default();
        app.listen = (port) => __awaiter(this, void 0, void 0, function* () {
            const vite = yield vite_1.createServer(Object.assign(Object.assign({}, config), { server: {
                    port: options.port,
                    watch: {
                        cwd: options.cwd
                    }
                } }));
            app.vite = vite;
            const viteHandle = vite.middlewares.handle.bind(vite.middlewares);
            vite.middlewares.handle = app.handle.bind(app);
            app.use((req, res, next) => {
                viteHandle(req, res, next);
            });
            vite.listen(port);
        });
        return app;
    });
}
exports.default = TickVite;
