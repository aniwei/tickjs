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
exports.defaultTransformer = exports.TickMiniTransformer = void 0;
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
// @ts-ignore
const escodegen_1 = __importDefault(require("escodegen"));
const acorn = __importStar(require("acorn"));
const walk = __importStar(require("acorn-walk"));
class TickMiniTransformer {
    constructor() {
        this.middlewares = [];
        this.handle = (code, id) => {
            return new Promise((resolve, reject) => {
                const dispatch = (index) => {
                    if (!this.middlewares[index]) {
                        return resolve(null);
                    }
                    const middle = this.middlewares[index];
                    if (middle.path.test(id)) {
                        const hash = crypto_1.default
                            .createHash('md5')
                            .update(code)
                            .digest('hex');
                        if (hash === middle.hash) {
                            resolve({
                                code: middle.code,
                                id
                            });
                        }
                        else {
                            Promise.resolve(middle.handle(code, id)).then(code => {
                                if (code === undefined || code === null) {
                                    dispatch(index + 1);
                                }
                                else {
                                    middle.hash = hash;
                                    middle.code = code;
                                    resolve({
                                        code,
                                        id
                                    });
                                }
                            });
                        }
                    }
                    else {
                        dispatch(index + 1);
                    }
                };
                dispatch(0);
            });
        };
    }
    use(path, handle) {
        this.middlewares.push({
            path,
            handle,
            hash: null,
            code: null
        });
        return this;
    }
}
exports.TickMiniTransformer = TickMiniTransformer;
TickMiniTransformer.extensions = ['.png', '.jpg', '.jpeg', '.gif', '.css', '.less', '.sass'];
exports.defaultTransformer = new TickMiniTransformer();
exports.defaultTransformer.use(/@react\-navigation_stack\.js/g, (code) => {
    const ast = acorn.parse(code, {
        ecmaVersion: 'latest',
        sourceType: 'module'
    });
    walk.full(ast, (node) => {
        if (node.type === 'CallExpression') {
            const callee = node.callee;
            const args = node.arguments;
            if (callee.type === 'Identifier' &&
                callee.name === 'require') {
                const firstArgument = args[0];
                const value = firstArgument.value;
                const parsed = path_1.default.parse(value);
                if (TickMiniTransformer.extensions.includes(parsed.ext)) {
                    node.type = firstArgument.type;
                    node.value = firstArgument.value.replace(path_1.default.resolve(__dirname, '../../node_modules'), '');
                }
            }
        }
    });
    return escodegen_1.default.generate(ast);
});
