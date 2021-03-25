import axios from 'axios';
import URL from 'url-parse';
import { LocalStorage } from 'node-localstorage'
import { Request, response, Response } from 'express';

export interface TickMiniAdaptersInterface {
  createRequestTask (req: Request, res: Response): void;
  getSystemInfo? (req: Request, res: Response): void;
  getNetworkType? (req: Request, res: Response): void;
  getStorage (req: Request, res: Response): void;
  setStorage (req: Request, res: Response): void;
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
  public localStorage: LocalStorage = new LocalStorage('./storage')

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
      res.statusCode = result.status;
      res.json({
        data: result.data,
        header: result.headers,
        statusCode: result.status
      }).end();
    }).catch(error => {
      res.statusCode = 400;
      res.end();
    })
  }

  getStorage (req: Request, res: Response) {
    const { options } = req.body;
    const { key, storageId } = options;

    const data = this.localStorage.getItem(`${storageId}:${key}`);
    res.statusCode = 200;
    
    res.json({ data }).end();
  }

  setStorage (req: Request, res: Response) {
    const { options } = req.body;
    const { key, storageId, data } = options;

    this.localStorage.setItem(`${storageId}:${key}`, data);
    res.statusCode = 200;
    res.end();
  }

  login (req: Request, res: Response) {
    res.statusCode = 200;
    res.json({ code: Date.now() }).end();
  }
}