import axios from 'axios';

export async function createRequestTask (context) {
  const { body } = context.request;

  if (body.url.indexOf('login_v1') > -1) {
    return context.body = {
      data: {
        "code": 0,
        "message": "SUCCESS",
        "requestId": null,
        "data": {
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MzU2MjU1IiwidXNlcl9tYWluX2lkIjoyMjg0MDI1NSwiY2hhbm5lbCI6IlciLCJzb3VyY2UiOiJhcGkiLCJpc19ndWVzdCI6ZmFsc2UsImxhYmVsIjoiY2xpZW50OndlYXBwIiwiaWF0IjoxNjE0NDE1MjIxLCJuYmYiOjE2MTQ0MTUyMjEsImV4cCI6MTYxNDQyMjQyMSwiaXNzIjoiaGV5dGVhIn0.j1ZBN42xTyZnPbqfhqGK2iRcbP1m4MEcqjgOIFEIqP4",
          "nickName": "Aniwei",
          "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLribspDrHFPbbn9GuLnbwr2Xb8Sib7lFI5k9UVuxlqwjcaAQbEqoicRAlChxU08uxMMrAaPmIVVibU8g/132",
          "authorized": true,
          "bindPhone": true,
          "bindEmail": false,
          "guest": false,
          "expired_at": "2021-02-27T08:48:46.452"
        }
      },
      state: 'success',
      statusCode: 200,
      header: {
        'content-type':	'application/prs.heytea.v1+json'
      }
    }
  }

  const { method, url, header, data } = body;
  let promise;

  if (method === 'GET') {
    promise = axios.get(url, {
      headers: header
    });
  } else if (method === 'POST') {
    promise = axios.post(url, {
      data,
      headers: header
    });
  } else {
    promise = axios(url, {
      headers: header
    });
  }

  context.body = await promise.then(res => {
    return Promise.resolve({
      state: 'success',
      data: res.data,
      statusCode: res.status,
      header: res.headers
    })
  }).catch(error => {
    // debugger;
  })
}