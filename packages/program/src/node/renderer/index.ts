import { resolve } from 'path';
import { EventEmitter } from 'events';
import debug from 'debug';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import { MiniProgramImpl } from '../MiniProgramImpl';

export class MiniProgramRenderer extends EventEmitter {
  public browser: puppeteer.Browser | null = null;
  public pages: Map<string, puppeteer.Page> = new Map;
  public current: puppeteer.Page | null = null;

  public html: string = fs.readFileSync(resolve(__dirname, 'WAPageFrame.html')).toString();
  public context = fs.readFileSync(resolve(__dirname, 'context.js')).toString();
  public javascript = fs.readFileSync(resolve(__dirname, 'WAWebview.js')).toString();
  public wxappcode = fs.readFileSync(resolve(__dirname, 'wxappcode.js')).toString();

  public miniProgram:  MiniProgramImpl | null = null;
  public config: any | null = null;

  constructor (miniProgram) {
    super();
    this.miniProgram = miniProgram;
  }
  
  async launch (config) {
    this.config = config;
    this.browser = await puppeteer.launch();
  }

  distroy () {
    this.browser?.close();
  }

  async publish (name, options, callbackId) {
    

    if (name === 'custom_event_onAppRoute') {
      const data = JSON.parse(options).data;

      await this.open(data.path);

      this.current?.evaluate(`WeixinJSBridge.subscribeHandler("${name}", ${options}, ${callbackId})`);
      // this.open()
    }
  }

  async open (uri) {
    if (!this.pages.has(uri)) {
      const page = await this.browser?.newPage() as puppeteer.Page;
      page.setContent(this.html);
      
      await page.exposeFunction('__invokeHandler__', (name) => {
        console.log('__invokeHandler__', name);
      });

      await page.exposeFunction('__publishHandler__', async (name, params, callbackId, options) => { 
        this.miniProgram?.subscribeHandler(name, JSON.parse(params), callbackId, options);
      });

      page.evaluate(this.context as string);
      
      page.evaluate(`window.__wxConfig=${JSON.stringify(this.config)};`);
      
      
      page.evaluate(this.javascript as string);
      page.evaluate(this.wxappcode as string);

      page.evaluate(`
        var route = __wxConfig.appLaunchInfo.path.replace(/\.html$/, '');
        __wxAppCode__[route + '.wxss']();
        console.log('route', __wxAppCode__[route + '.wxml']);

        var event = new CustomEvent('generateFuncReady', { 
          detail: { 
            generateFunc: __wxAppCode__[route + '.wxml'] 
          } 
        });
        document.dispatchEvent(event);
        
      `);
      // page.evaluate(`__wxAppCode__[__wxConfig.appLaunchInfo.path.replace(/\.html$/, "").replace(/^\//, "") + '.wxss']()`);
      // page.evaluate(`document.dispatchEvent(new CustomEvent('generateFuncReady'), { detail: { generateFunc: __wxAppCode__[__wxConfig.appLaunchInfo.path.replace(/\.html$/, "").replace(/^\//, "") + '.wxml'] } });`)
      page.evaluate(`WeixinJSBridge.subscribeHandler('onWxConfigReady', '', 0, '')`);

      page.screenshot({
        path: __dirname + '/screenshot.png' 
      });

      page.on('close', () => {
        this.pages.delete(uri);
      });

      page.on('console', message => {
        const type = message.type();
        const text = message.text();

        console[type](text);
      });

      this.pages.set(uri, page);
      this.current = page;
    }
  }
}

// runMiniProgramRenderer({
//   deprecated: false,
//   env: {
//     USER_DATA_PATH: '/Users/weiyanhai/.tick/program'
//   },
//   appLaunchInfo: {
//     path: 'subpacks/UsuallyModule/Invite/InviteDetail',
//     query: {
//       scene: '',
//       shareCode: 'LKYP_91959434850184',
//       type: '1'
//     },
//     scene: 1001,
//     shareTicket: null,
//     referrerInfo: {
//       appid: 'wx42c1491feb6d12a1'
//     },
//   },
//   ext: {},
//   wxAppInfo: {
//     maxRequestConcurrent: 10,
//     maxUploadConcurrent: 10,
//     maxDownloadConcurrent: 10,
//     maxWorkerConcurrent: 1,
//     maxWebsocketConnect: 2,
//   },
//   debug: true,
//   entryPagePath: 'pages/index/index.html',
//   envVersion: 'release',
//   tabBar: {
//     list: []
//   },
//   pages: [
//     'pages/index/index',
//     'pages/HotelList/HotelList',
//     'pages/HotelDetails/HotelDetails',
//     'pages/CityPicker/CityPicker',
//     'pages/DatePicker/DatePicker',
//     'pages/CouponsPicker/CouponsPicker',
//     'pages/FreeRoomPicker/FreeRoomPicker',
//     'pages/HousesTicketPicker/HousesTicketPicker',
//     'pages/Order/Order',
//     'pages/OrderDetails/OrderDetails',
//     'pages/BindAccount/BindAccount',
//     'pages/BreakfastSale/BreakfastSale',
//     'pages/Login/Login',
//     'pages/WebView/WebView',
//     'pages/Login/authorize',
//     'pages/AuthorizeLogin/AuthorizeLogin',
//     'pages/LoginByMobile/LoginByMobile',
//     'pages/CancelOrder/CancelOrder',
//     'pages/SearchChain/SearchChain',
//     'pages/lifeHouseOrderDetail/lifeHouseOrderDetail',
//     'pages/HotelBookNew/HotelBookNew',
//     'pages/mebCenter/mebCenter',
//     'pages/selfHelp/selfHelp',
//     'pages/OrderSuccess/OrderSuccess',
//     'pages/costumService/costumService',
//     'pages/Snapshot/PublishSnapshot/PublishSnapshot',
//     'pages/Snapshot/Publish/Publish',
//     'pages/Snapshot/ChainList/ChainList',
//     'pages/ActivityWebView/ActivityWebView',
//     'pages/IntelligentLock/OpenLock/OpenLock',
//     'pages/IntelligentLock/GuestInvite/GuestInvite',
//     'pages/IntelligentLock/SendInvite/SendInvite',
//     'pages/Mine/Mine',
//     'pages/IdentityInformation/confirm',
//     'pages/NewWebView/NewWebView',
//     'pages/AuthenticationCheck/ChooseAction/ChooseAction',
//     'pages/AuthenticationCheck/PersonInfo/PersonInfo',
//     'pages/HotelList/SearchFilter/SearchFilter',
//     'pages/HotelBookNew/NoteChoose/NoteChoose',
//     'pages/AplusSelect/AplusSelect',
//     'pages/h5JumpOtherApp/h5JumpOtherApp',
//     'pages/AutoCheckout/AutoCheckout',
//     'pages/SmartSelfHelp/SmartSelfHelp',
//     'pages/ZplusSelect/ZplusSelect',
//     'pages/duibaPay/duibaPay',
//     'pages/duibaRedirect/duibaRedirect',
//     'pages/OrderHistory/OrderHistory',
//     'subpacks/BecomePlus/BecomePlus/BecomePlus',
//     'subpacks/Activity/HotelSelfMarketing/HotelSelfMarketing',
//     'subpacks/Activity/TogetherBuy/TogetherBuy',
//     'subpacks/Activity/YearSummarize/YearSummarize',
//     'subpacks/Activity/2020MarchMebActivity/MarchMebActivity',
//     'subpacks/OnlineModule/AutoCheckoutNew/AutoCheckoutNew',
//     'subpacks/OnlineModule/InvoiceForSelfHelp/InvoiceForSelfHelp',
//     'subpacks/OnlineModule/CustomSend/CustomSend',
//     'subpacks/OnlineModule/CustomSend/CustomSendLog',
//     'subpacks/OnlineModule/ContinueOnline/ContinueOnline',
//     'subpacks/OnlineModule/ChoiceRoomOnline/ChoiceRoomOnline',
//     'subpacks/OnlineModule/CheckInOnline/ArrangeRoom/arrangeRoom',
//     'subpacks/OnlineModule/CheckInOnline/CheckInOnline/CheckInOnline',
//     'subpacks/OnlineModule/CheckInOnline/CheckInSuccess/CheckInSuccess',
//     'subpacks/OnlineModule/VerifyID/Verified/Verified',
//     'subpacks/OnlineModule/VerifyID/VerifiedFace1/VerifiedFace',
//     'subpacks/UsuallyModule/addFamilyNumber/addFamilyNumber',
//     'subpacks/UsuallyModule/AddInvoice/AddInvoice',
//     'subpacks/UsuallyModule/Agreement/BindAgreementCode/BindAgreementCode',
//     'subpacks/UsuallyModule/Agreement/BindAgreementEmail/BindAgreementEmail',
//     'subpacks/UsuallyModule/FamilyAccount/FamilyAccount',
//     'subpacks/UsuallyModule/FamilyNumberList/FamilyNumberList',
//     'subpacks/UsuallyModule/GiftPackage/GiftPackage',
//     'subpacks/UsuallyModule/CouponsPackage/CouponsPackage',
//     'subpacks/UsuallyModule/Invite/Invite',
//     'subpacks/UsuallyModule/Invite/InviteDetail',
//     'subpacks/UsuallyModule/OrderForInvoice/OrderForInvoice',
//     'subpacks/UsuallyModule/Cashier/Cashier',
//     'subpacks/UsuallyModule/SetPassword/SetPassword',
//     'subpacks/UsuallyModule/Setting/Setting',
//     'subpacks/UsuallyModule/UnavailableCoupons/UnavailableCoupons',
//     'subpacks/UsuallyModule/PersonalInformation/PersonalInformation',
//     'subpacks/UsuallyModule/CommonInfo/CommonInfo',
//     'subpacks/UsuallyModule/CommonInfo/Address/Address',
//     'subpacks/UsuallyModule/CommonInfo/Address/AddAddress',
//     'subpacks/UsuallyModule/CommonInfo/Address/EditAddress',
//     'subpacks/UsuallyModule/CommonInfo/Person/AddPerson',
//     'subpacks/UsuallyModule/CommonInfo/Person/AddPersonNew',
//     'subpacks/UsuallyModule/CommonInfo/Person/EditPerson',
//     'subpacks/UsuallyModule/CommonInfo/Person/SelectPerson',
//     'subpacks/UsuallyModule/CommonInfo/Person/SelectPersonNew',
//     'subpacks/UsuallyModule/CommonInfo/Invoice/Invoice',
//     'subpacks/UsuallyModule/CommonInfo/Invoice/AddInvoice',
//     'subpacks/UsuallyModule/CommonInfo/Invoice/EditInvoice',
//     'subpacks/UsuallyModule/CommonInfo/Invoice/rule',
//     'subpacks/UsuallyModule/CommonInfo/Invoice/Detail',
//     'subpacks/UsuallyModule/Comment/Comment',
//     'subpacks/UsuallyModule/Comment/MyComment/MyComment',
//     'subpacks/UsuallyModule/AplusComment/AplusComment',
//     'subpacks/UsuallyModule/AplusComment/AplusCommentSuccess',
//     'subpacks/UsuallyModule/HotelMap/HotelMap',
//     'subpacks/UsuallyModule/HotelComment/HotelComment',
//     'subpacks/UsuallyModule/BindRoomAndId/BindRoomAndId',
//     'subpacks/UsuallyModule/BindRoomAndId/BindRoomAndIdConfirm',
//     'subpacks/UsuallyModule/MakeComplain/SubmitComplain/SubmitComplain',
//     'subpacks/UsuallyModule/MakeComplain/ComplainSuccess/ComplainSuccess',
//     'subpacks/UsuallyModule/MakeComplain/ComplainComment/ComplainComment',
//     'subpacks/UsuallyModule/CheckOrder/Index/Index',
//     'subpacks/UsuallyModule/CheckOrder/CheckOrder/CheckOrder',
//     'subpacks/UsuallyModule/SelectCorpAgreement/SelectCorpAgreement',
//     'subpacks/UsuallyModule/Agreement/BindAgreementList/BindAgreementList',
//     'subpacks/UsuallyModule/HotelCommentList/HotelCommentList',
//     'subpacks/UsuallyModule/AccountSecurity/AccountSecurity',
//     'subpacks/UsuallyModule/AboutAtour/AboutAtour',
//     'subpacks/UsuallyModule/SetNickName/SetNickName',
//     'subpacks/UsuallyModule/SetTrueName/SetTrueName',
//     'subpacks/UsuallyModule/SetPhone/SetPhone',
//     'subpacks/UsuallyModule/SetEmail/SetEmail',
//     'subpacks/HonorOfKings/HonorOfKings',
//   ],
//   page: {
//     'subpacks/UsuallyModule/Invite/InviteDetail.html': {
//       window: {
//         backgroundColor: '#fafafa',
//         backgroundTextStyle: 'dark',
//         enablePullDownRefresh: false,
//         navigationBarBackgroundColor: '#fff',
//         navigationBarTextStyle: 'black',
//         navigationBarTitleText: '亚朵新人礼包',
//       }
//     }
//   },
//   accountInfo: {
//     appId: 'wx42c1491feb6d12a1',
//     icon: 'https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png',
//     nickname: '亚朵ATOUR'
//   },
//   global: {
//     window: {
//       backgroundColor: '#fafafa',
//       backgroundTextStyle: 'dark',
//       enablePullDownRefresh: false,
//       navigationBarBackgroundColor: '#fff',
//       navigationBarTextStyle: 'black',
//       navigationBarTitleText: '亚朵',
//     }
//   },
//   platform: 'mac',
//   appType: 0,
//   networkTimeout: {
//     request: 60000,
//     uploadFile: 60000,
//     connectSocket: 60000,
//     downloadFile: 60000,
//   },
//   extAppid: ''
// });