import axios from 'axios';
import URL from 'url-parse';
import qs from 'qs';
import { Request, Response } from 'express';
import { TickMiniProjLoader } from './TickMiniProjLoader';

export interface TickMiniAdaptersInterface {
  createRequestTask (req: Request, res: Response, proj: TickMiniProjLoader): void;
  getSystemInfo? (req: Request, res: Response, proj: TickMiniProjLoader): void;
  getNetworkType? (req: Request, res: Response, proj: TickMiniProjLoader): void;
  getStorage (req: Request, res: Response, proj: TickMiniProjLoader): void;
  setStorage (req: Request, res: Response, proj: TickMiniProjLoader): void;
}

axios.interceptors.response.use((res) => {
  const { config } = res;
  const url = new URL(config.url as string);

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
    }
  }

  return res;
})

export class DefaultAdapters implements TickMiniAdaptersInterface {
  static hostname = {
    dev: 'https://servicewechat.com/wxa-dev-logic'
  }
  createRequestTask (
    req: Request, 
    res: Response
  ) {
    const body = req.body as any;
    const options = {
      method: body.options.method,
      url: body.options.url,
      responseType: body.options.responseType,
      headers: body.options.header,
      data: body.options.data
    }
    
    axios(options).then(result => {
      res.status(result.status)
        .json({
          data: result.data,
          header: result.headers,
          statusCode: result.status
        }).end();
    }).catch(error => {
      res.status(400).end();
    })
  }

  getStorage (req: Request, res: Response, proj: TickMiniProjLoader) {
    const { options } = req.body;
    const { key, storageId } = options;

    const data = proj.storage?.getItem(`user:${storageId}:${key}`);
    
    res.status(200).json({ data }).end();
  }

  setStorage (req: Request, res: Response, proj: TickMiniProjLoader) {
    const { options } = req.body;
    const { key, storageId, data } = options;

    proj.storage?.setItem(`user:${storageId}:${key}`, data);
    res.statusCode = 200;
    res.end();
  }

  login (req: Request, res: Response, proj: TickMiniProjLoader) {
    proj.weixin.getLoginCode().then(result => {
      res
        .status(200)
        .send({ code: result.data.code })
        .end();
    })
  }

  operateWXData (req: Request, res: Response, proj: TickMiniProjLoader) {
    const { data } = req.body.options;
    proj.weixin.operateWXData(data).then(result => {
      res
        .status(200)
        .send({ ...result.data })
        .end();
    })
  }


}