import axios from 'axios';
import qs from 'qs';

import { TinyEmitter } from 'tiny-emitter';
import { TickMiniProjLoader } from './TickMiniProjLoader';

export enum TickWXResultState {
  WAITING = 'waiting',
  SCANNED = 'scanned',
  SUCCESS = 'success',
  FAIL = 'fail'
}

export type TickWXResult = {
  state: TickWXResultState,
  expireIn: number,
  id: number | string,
  code: number | string,
  data: any
}

export class TickWX extends TinyEmitter {
  static hostname = {
    dev: 'https://servicewechat.com/wxa-dev-logic',
    open: `https://open.weixin.qq.com/connect/qrconnect`,
    long: `https://long.open.weixin.qq.com/connect/l/qrconnect`,
    ticket: `https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/qrcode` 
  }
  
  static timeout = 60000;
  static results: Map<string, any> = new Map();

  public appid: string = 'wxde40e023744664cb';
  public proj: TickMiniProjLoader;

  constructor (proj) {
    super();

    this.proj = proj;
  }

  request (name, query?, data?) {
    const authorizion = this.proj.storage.getItem('@weixin:authorizion') as any;

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

    const uri = `${TickWX.hostname.dev}/${name}?${qs.stringify(query)}`;

    return axios.post(uri, { data });
  }

  signIn (id: string) {
    const query = qs.stringify({
      appid: this.appid,
      redirect_uri: TickWX.hostname.ticket,
      scope: `snsapi_login`,
      state: `login`
    });

    axios.get(`${TickWX.hostname.open}?${query}`).then(res => {
      const matched = /"\/connect\/qrcode\/([a-zA-Z0-9]+)"/g.exec(res.data)

      if (matched && matched[1]) {
        this.emit('polling', matched[1], id);
      }
    });

    return this.polling();
  }

  getLoginCode () {
    return this.request('jslogin', {
      scope: ['snsapi_base']
    });
  }
  
  operateWXData (data) {
    return this.request('jsoperatewxdata', data)
  }

  getTicket (code) {
    const state = Date.now();
    return axios.get(`${TickWX.hostname.ticket}?code=${code}&state=${state}`).then(res => {
      const { baseresponse, ...rest } = res.data;
      const headers = res.headers;

      if (baseresponse.errcode === 0) {
        return Promise.resolve({
          ...rest,
          ticket: headers['debugger-ticket'],
          newticket: headers['debugger-newticket'],
          signature: headers['debugger-signature']
        });
      }
    })
  }

  polling () {
    return new Promise((resolve, reject) => {
      this.once('polling', (code, id) => {
        const result: TickWXResult = {
          id,
          code,
          data: {},
          state: TickWXResultState.WAITING,
          expireIn: Date.now() + TickWX.timeout
        }

        TickWX.results.set(id, result);

        const fetching = () => {
          if (Date.now() > result.expireIn) {
            result.state = TickWXResultState.FAIL;
          } else {
            axios.get(`${TickWX.hostname.long}?uuid=${code}`).then(res => {
              const callback = new Function(`window`, res.data + 'return window;');
              const { wx_errcode, wx_code } = callback({});

              switch (wx_errcode) {
                case 405: {
                  this.getTicket(wx_code).then(data => {
                    result.state = TickWXResultState.SUCCESS;
                    result.data = data;
                  }).catch(error => {
                    result.state = TickWXResultState.FAIL;
                  })
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
        }
  
        fetching();
        resolve(`https://open.weixin.qq.com/connect/qrcode/${code}`)
      });
    });
  }
}