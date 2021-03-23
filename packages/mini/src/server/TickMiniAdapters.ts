import axios from 'axios';
import { Request, Response } from 'express';

export interface TickMiniAdaptersInterface {
  createRequestTask (req: Request, res: Response): void;
  getSystemInfo (req: Request, res: Response): void;
  getNetworkType (req: Request, res: Response): void;
  getStorage (req: Request, res: Response): void;
  setStorage (req: Request, res: Response): void;
}

export class DefaultAdapters implements TickMiniAdaptersInterface {

  getNetworkType () {}

  getSystemInfo () {

  }

  createRequestTask (
    req: Request, 
    res: Response
  ) {
    const body = req.body as any;
    const options = {
      method: body.method,
      url: body.url,
      responseType: body.responseType,
      headers: body.header,
      data: body.data
    }
    
    axios(options).then(result => {
      res.statusCode = result.status;
      res.json(result);
    }).catch(error => {
      debugger;
    })
  }

  getStorage () {

  }

  setStorage () {}
}