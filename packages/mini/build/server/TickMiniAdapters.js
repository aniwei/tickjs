"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAdapters = void 0;
const axios_1 = __importDefault(require("axios"));
const url_parse_1 = __importDefault(require("url-parse"));
axios_1.default.interceptors.response.use((res) => {
    const { config } = res;
    const url = new url_parse_1.default(config.url);
    if (url.pathname === '/passport/authenticate/wxapp/verify') {
        res.data = {
            "code": 0,
            "message": "",
            "data": {
                "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJ1bmlvbkNvZGUiOiJQNDA0MDE1NDcyNzA4NTA1NjAwIiwidXNlcklkIjoiMTA1MDkxMTkwIiwiYnJhbmQiOiIyNjAwMDI1MiIsInBob25lIjoib2I5eUE0cUo1WGpnZlE1RE8xQWhYdGRnWFQ4SSIsImlzcyI6InBkLXBhc3Nwb3J0Iiwic3ViIjoiMTA1MDkxMTkwIiwiaWF0IjoxNjA5MzAyODI5LCJleHAiOjE2MTk2NzA4Mjl9.r2_32rfLgqd-E7pA7khl7yleo2Oo5IQWTrVwi0XOUgs",
                "bindCode": 0,
                "firstLogin": false,
                "needInfo": false
            },
            "dataType": "UserLoginVO",
            "success": true
        };
    }
    return res;
});
class DefaultAdapters {
    createRequestTask(req, res) {
        const body = req.body;
        const options = {
            method: body.options.method,
            url: body.options.url,
            responseType: body.options.responseType,
            headers: body.options.header,
            data: body.options.data
        };
        axios_1.default(options).then(result => {
            res.status(result.status)
                .json({
                data: result.data,
                header: result.headers,
                statusCode: result.status
            }).end();
        }).catch(error => {
            res.status(400).end();
        });
    }
    getStorage(req, res, proj) {
        const { options } = req.body;
        const { key, storageId } = options;
        const data = proj.storage.getItem(`user:${storageId}:${key}`);
        res.status(200).json({ data }).end();
    }
    setStorage(req, res, proj) {
        const { options } = req.body;
        const { key, storageId, data } = options;
        proj.storage.setItem(`user:${storageId}:${key}`, data);
        res.statusCode = 200;
        res.end();
    }
    login(req, res, proj) {
        proj.weixin.getLoginCode().then(result => {
            res
                .status(200)
                .send({ code: result.data.code })
                .end();
        });
    }
    operateWXData(req, res, proj) {
        const data = JSON.stringify(req.body.options.data);
        proj.weixin.operateWXData(data).then(result => {
            const data = JSON.parse(result.data.data);
            res
                .status(200)
                .send({ data })
                .end();
        });
    }
}
exports.DefaultAdapters = DefaultAdapters;
DefaultAdapters.hostname = {
    dev: 'https://servicewechat.com/wxa-dev-logic'
};
