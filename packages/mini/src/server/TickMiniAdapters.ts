import axios from 'axios';
import { LocalStorage } from 'node-localstorage'
import { Request, Response } from 'express';

export interface TickMiniAdaptersInterface {
  createRequestTask (req: Request, res: Response): void;
  getSystemInfo? (req: Request, res: Response): void;
  getNetworkType? (req: Request, res: Response): void;
  getStorage (req: Request, res: Response): void;
  setStorage (req: Request, res: Response): void;
}

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