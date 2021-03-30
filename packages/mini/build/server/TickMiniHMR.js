"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickMiniHMR = void 0;
// @ts-ignore
const regexp_clone_1 = __importDefault(require("regexp-clone"));
function defaultMiddle() { }
class TickMiniHMR {
    constructor() {
        this.middlewares = [];
        this.handle = (hmr, context) => {
            const index = hmr.file.indexOf(context.config.client);
            const newId = index === 0 ? hmr.file.slice(context.config.client.length) : hmr.file;
            return new Promise((resolve, reject) => {
                const dispatch = (index) => {
                    const intercept = this.middlewares[index];
                    if (intercept === undefined) {
                        resolve(null);
                    }
                    else {
                        const { path, middle, handle } = intercept;
                        intercept.path = regexp_clone_1.default(path);
                        const matched = path.exec(newId);
                        if (matched === null) {
                            dispatch(index + 1);
                        }
                        else {
                            const newMatched = [newId, hmr];
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
}
exports.TickMiniHMR = TickMiniHMR;
