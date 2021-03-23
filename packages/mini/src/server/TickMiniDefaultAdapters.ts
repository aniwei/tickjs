import axios from 'axios';
import { IncomingMessage, ServerResponse } from 'http';



export function createRequestTask (
  req: IncomingMessage, 
  res: ServerResponse
) {
  const body = req.body;
  const options = {
    method: body.method,
    url: body.url,
    responseType: body.responseType,
    headers: body.header,
    data: body.data
  }
  
  axios(options).then(result => {
    debugger;
  }).catch(error => {

  })

}