const { JSDOM } = require('jsdom');
const qrcode = require('qrcode-terminal');
const unirest = require('unirest');
const qs = require('qs');


const host = `https://open.weixin.qq.com`;
const pathname = `/connect/qrconnect`
const query = {
  appid: `wxde40e023744664cb`,
  redirect_uri: `https://mp.weixin.qq.com/debug/cgi-bin/webdebugger/qrcode`,
  scope: `snsapi_login`,
  state: `login`
}

function poll (uuid) {
  const request = () => {
    unirest.get(`https://long.open.weixin.qq.com/connect/l/qrconnect?uuid=${uuid}`)
      .then(res => {
        console.log(res.body);

        if (1) {
          setTimeout(request, 1000);
        }
      });
  }

  request();
}


unirest.get(`${host}${pathname}?${qs.stringify(query)}` )
  .then(res => {
    const dom = new JSDOM(res.body);
    const image = dom.window.document.querySelector(`.qrcode.lightBorder`);

    console.log(`${host}${image.src}`);
    poll(image.src.replace(`/connect/qrcode/`, ''));

    // qrcode.generate(`${host}${image.src}`, (qrcode) => {
    //   console.log(qrcode);

    //   poll(image.src.replace(`/connect/qrcode/`, ''));
    // });
  });