"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickWX = exports.TickWXResultState = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const tiny_emitter_1 = require("tiny-emitter");
var TickWXResultState;
(function (TickWXResultState) {
    TickWXResultState["WAITING"] = "waiting";
    TickWXResultState["SCANNED"] = "scanned";
    TickWXResultState["SUCCESS"] = "success";
    TickWXResultState["FAIL"] = "fail";
})(TickWXResultState = exports.TickWXResultState || (exports.TickWXResultState = {}));
class TickWX extends tiny_emitter_1.TinyEmitter {
    constructor(proj) {
        super();
        this.appid = 'wxde40e023744664cb';
        this.proj = proj;
    }
    request(name, query, data) {
        const authorizion = this.proj.storage.getItem('@weixin:authorizion');
        if (data === undefined) {
            data = query;
            query = {};
        }
        if (authorizion) {
            const { data } = JSON.parse(authorizion);
            query.newticket = data.newticket;
            query.appId = this.proj.account.appId;
        }
        query.platform = 0;
        query.os = 'darwin';
        query.clientversion = '1052102010';
        const uri = `${TickWX.hostname.dev}/${name}?${qs_1.default.stringify(query)}`;
        return axios_1.default.post(uri, { data });
    }
    signIn(id) {
        const query = qs_1.default.stringify({
            appid: this.appid,
            redirect_uri: TickWX.hostname.ticket,
            scope: `snsapi_login`,
            state: `login`
        });
        axios_1.default.get(`${TickWX.hostname.open}?${query}`).then(res => {
            const matched = /"\/connect\/qrcode\/([a-zA-Z0-9]+)"/g.exec(res.data);
            if (matched && matched[1]) {
                this.emit('polling', matched[1], id);
            }
        });
        return this.polling();
    }
    getLoginCode() {
        return this.request('jslogin', {
            scope: ['snsapi_base']
        });
    }
    operateWXData(data) {
        return this.request('jsoperatewxdata', data);
    }
    getTicket(code) {
        const state = Date.now();
        return axios_1.default.get(`${TickWX.hostname.ticket}?code=${code}&state=${state}`).then(res => {
            const _a = res.data, { baseresponse } = _a, rest = __rest(_a, ["baseresponse"]);
            const headers = res.headers;
            if (baseresponse.errcode === 0) {
                return Promise.resolve(Object.assign(Object.assign({}, rest), { ticket: headers['debugger-ticket'], newticket: headers['debugger-newticket'], signature: headers['debugger-signature'] }));
            }
        });
    }
    polling() {
        return new Promise((resolve, reject) => {
            this.once('polling', (code, id) => {
                const result = {
                    id,
                    code,
                    data: {},
                    state: TickWXResultState.WAITING,
                    expireIn: Date.now() + TickWX.timeout
                };
                TickWX.results.set(id, result);
                const fetching = () => {
                    if (Date.now() > result.expireIn) {
                        result.state = TickWXResultState.FAIL;
                    }
                    else {
                        axios_1.default.get(`${TickWX.hostname.long}?uuid=${code}`).then(res => {
                            const callback = new Function(`window`, res.data + 'return window;');
                            const { wx_errcode, wx_code } = callback({});
                            switch (wx_errcode) {
                                case 405: {
                                    this.getTicket(wx_code).then(data => {
                                        result.state = TickWXResultState.SUCCESS;
                                        result.data = data;
                                    }).catch(error => {
                                        result.state = TickWXResultState.FAIL;
                                    });
                                    break;
                                }
                                case 404: {
                                    result.state = TickWXResultState.SCANNED;
                                }
                                case 408:
                                default: {
                                    setTimeout(fetching, 2000);
                                }
                            }
                        });
                    }
                };
                fetching();
                resolve(`https://open.weixin.qq.com/connect/qrcode/${code}`);
            });
        });
    }
}
exports.TickWX = TickWX;
TickWX.hostname = {
    dev: 'https://servicewechat.com/wxa-dev-logic',
    open: `https://open.weixin.qq.com/connect/qrconnect`,
    long: `https://long.open.weixin.qq.com/connect/l/qrconnect`,
    ticket: `https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/qrcode`
};
TickWX.timeout = 60000;
TickWX.results = new Map();
