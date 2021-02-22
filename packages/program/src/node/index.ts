
import { resolve } from 'path';
import debug from 'debug';
import fs from 'fs-extra';
import { MiniProgramImpl } from './MiniProgramImpl';

export async function injectMiniProgramContext (miniProgram) {
  miniProgram.injectContext('setTimeout', setTimeout);
  miniProgram.injectContext('setInterval', setInterval);
  miniProgram.injectContext('clearTimeout', clearTimeout);
  
  miniProgram.injectContext('navigator', {
    userAgent: ''
  });
}

export async function createMiniProgram ({ appid, application, config }) {
  const miniProgram = new MiniProgramImpl(appid, config);

  injectMiniProgramContext(miniProgram);

  miniProgram.injectContext('__wxConfig', config);


  const SDKFilePath = (resolve(__dirname, '../MiniProgram/WASDK'));
  const service = (await fs.readFile(resolve(SDKFilePath, 'WAService.js'))).toString();

  miniProgram.evaluateScript(service, 'WAService.js');
  miniProgram.evaluateScript(application, 'appservice.js');

  return miniProgram;
}

export async function runMiniProgram (config) {
  const SDKFilePath = (resolve(__dirname, '../MiniProgram/WASDK'));
  const application = (await fs.readFile(resolve(SDKFilePath, 'appservice.js'))).toString();

  // const subpacks = (await fs.readFile(resolve(SDKFilePath, 'subpacks.js'))).toString();
  

  const miniProgram = await createMiniProgram({
    appid: '',
    application,
    config,
  });

  // miniProgram.evaluateScript(subpacks, 'subpacks.js');

  miniProgram.launch(config.appLaunchInfo)

  return miniProgram;
}


async function main () {

  const miniProgram = await runMiniProgram({
    deprecated: false,
    env: {
      USER_DATA_PATH: '/Users/weiyanhai/.tick/program'
    },
    appLaunchInfo: {
      path: 'pages/order/orderList/orderList',
      query: {
        scene: '',
        shareCode: 'LKYP_91959434850184',
        type: '1',
        suid: '2d444f77-cf85-438e-8369-175cea90aa5b',
        ic: '8SZS84AB'
      },
      scene: 1001,
      shareTicket: null,
      referrerInfo: {
        appid: 'wx42c1491feb6d12a1'
      },
    },
    ext: {},
    wxAppInfo: {
      maxRequestConcurrent: 10,
      maxUploadConcurrent: 10,
      maxDownloadConcurrent: 10,
      maxWorkerConcurrent: 1,
      maxWebsocketConnect: 2,
    },
    debug: true,
    entryPagePath: 'pages/index/index.html',
    envVersion: 'release',
    tabBar: {
      list: []
    },
    pages: [
      'pages/index/index',
      'pages/HotelList/HotelList',
      'pages/HotelDetails/HotelDetails',
      'pages/CityPicker/CityPicker',
      'pages/DatePicker/DatePicker',
      'pages/CouponsPicker/CouponsPicker',
      'pages/FreeRoomPicker/FreeRoomPicker',
      'pages/HousesTicketPicker/HousesTicketPicker',
      'pages/Order/Order',
      'pages/OrderDetails/OrderDetails',
      'pages/BindAccount/BindAccount',
      'pages/BreakfastSale/BreakfastSale',
      'pages/Login/Login',
      'pages/WebView/WebView',
      'pages/Login/authorize',
      'pages/AuthorizeLogin/AuthorizeLogin',
      'pages/LoginByMobile/LoginByMobile',
      'pages/CancelOrder/CancelOrder',
      'pages/SearchChain/SearchChain',
      'pages/lifeHouseOrderDetail/lifeHouseOrderDetail',
      'pages/HotelBookNew/HotelBookNew',
      'pages/mebCenter/mebCenter',
      'pages/selfHelp/selfHelp',
      'pages/OrderSuccess/OrderSuccess',
      'pages/costumService/costumService',
      'pages/Snapshot/PublishSnapshot/PublishSnapshot',
      'pages/Snapshot/Publish/Publish',
      'pages/Snapshot/ChainList/ChainList',
      'pages/ActivityWebView/ActivityWebView',
      'pages/IntelligentLock/OpenLock/OpenLock',
      'pages/IntelligentLock/GuestInvite/GuestInvite',
      'pages/IntelligentLock/SendInvite/SendInvite',
      'pages/Mine/Mine',
      'pages/IdentityInformation/confirm',
      'pages/NewWebView/NewWebView',
      'pages/AuthenticationCheck/ChooseAction/ChooseAction',
      'pages/AuthenticationCheck/PersonInfo/PersonInfo',
      'pages/HotelList/SearchFilter/SearchFilter',
      'pages/HotelBookNew/NoteChoose/NoteChoose',
      'pages/AplusSelect/AplusSelect',
      'pages/h5JumpOtherApp/h5JumpOtherApp',
      'pages/AutoCheckout/AutoCheckout',
      'pages/SmartSelfHelp/SmartSelfHelp',
      'pages/ZplusSelect/ZplusSelect',
      'pages/duibaPay/duibaPay',
      'pages/duibaRedirect/duibaRedirect',
      'pages/OrderHistory/OrderHistory',
      'subpacks/BecomePlus/BecomePlus/BecomePlus',
      'subpacks/Activity/HotelSelfMarketing/HotelSelfMarketing',
      'subpacks/Activity/TogetherBuy/TogetherBuy',
      'subpacks/Activity/YearSummarize/YearSummarize',
      'subpacks/Activity/2020MarchMebActivity/MarchMebActivity',
      'subpacks/OnlineModule/AutoCheckoutNew/AutoCheckoutNew',
      'subpacks/OnlineModule/InvoiceForSelfHelp/InvoiceForSelfHelp',
      'subpacks/OnlineModule/CustomSend/CustomSend',
      'subpacks/OnlineModule/CustomSend/CustomSendLog',
      'subpacks/OnlineModule/ContinueOnline/ContinueOnline',
      'subpacks/OnlineModule/ChoiceRoomOnline/ChoiceRoomOnline',
      'subpacks/OnlineModule/CheckInOnline/ArrangeRoom/arrangeRoom',
      'subpacks/OnlineModule/CheckInOnline/CheckInOnline/CheckInOnline',
      'subpacks/OnlineModule/CheckInOnline/CheckInSuccess/CheckInSuccess',
      'subpacks/OnlineModule/VerifyID/Verified/Verified',
      'subpacks/OnlineModule/VerifyID/VerifiedFace1/VerifiedFace',
      'subpacks/UsuallyModule/addFamilyNumber/addFamilyNumber',
      'subpacks/UsuallyModule/AddInvoice/AddInvoice',
      'subpacks/UsuallyModule/Agreement/BindAgreementCode/BindAgreementCode',
      'subpacks/UsuallyModule/Agreement/BindAgreementEmail/BindAgreementEmail',
      'subpacks/UsuallyModule/FamilyAccount/FamilyAccount',
      'subpacks/UsuallyModule/FamilyNumberList/FamilyNumberList',
      'subpacks/UsuallyModule/GiftPackage/GiftPackage',
      'subpacks/UsuallyModule/CouponsPackage/CouponsPackage',
      'subpacks/UsuallyModule/Invite/Invite',
      'subpacks/UsuallyModule/Invite/InviteDetail',
      'subpacks/UsuallyModule/OrderForInvoice/OrderForInvoice',
      'subpacks/UsuallyModule/Cashier/Cashier',
      'subpacks/UsuallyModule/SetPassword/SetPassword',
      'subpacks/UsuallyModule/Setting/Setting',
      'subpacks/UsuallyModule/UnavailableCoupons/UnavailableCoupons',
      'subpacks/UsuallyModule/PersonalInformation/PersonalInformation',
      'subpacks/UsuallyModule/CommonInfo/CommonInfo',
      'subpacks/UsuallyModule/CommonInfo/Address/Address',
      'subpacks/UsuallyModule/CommonInfo/Address/AddAddress',
      'subpacks/UsuallyModule/CommonInfo/Address/EditAddress',
      'subpacks/UsuallyModule/CommonInfo/Person/AddPerson',
      'subpacks/UsuallyModule/CommonInfo/Person/AddPersonNew',
      'subpacks/UsuallyModule/CommonInfo/Person/EditPerson',
      'subpacks/UsuallyModule/CommonInfo/Person/SelectPerson',
      'subpacks/UsuallyModule/CommonInfo/Person/SelectPersonNew',
      'subpacks/UsuallyModule/CommonInfo/Invoice/Invoice',
      'subpacks/UsuallyModule/CommonInfo/Invoice/AddInvoice',
      'subpacks/UsuallyModule/CommonInfo/Invoice/EditInvoice',
      'subpacks/UsuallyModule/CommonInfo/Invoice/rule',
      'subpacks/UsuallyModule/CommonInfo/Invoice/Detail',
      'subpacks/UsuallyModule/Comment/Comment',
      'subpacks/UsuallyModule/Comment/MyComment/MyComment',
      'subpacks/UsuallyModule/AplusComment/AplusComment',
      'subpacks/UsuallyModule/AplusComment/AplusCommentSuccess',
      'subpacks/UsuallyModule/HotelMap/HotelMap',
      'subpacks/UsuallyModule/HotelComment/HotelComment',
      'subpacks/UsuallyModule/BindRoomAndId/BindRoomAndId',
      'subpacks/UsuallyModule/BindRoomAndId/BindRoomAndIdConfirm',
      'subpacks/UsuallyModule/MakeComplain/SubmitComplain/SubmitComplain',
      'subpacks/UsuallyModule/MakeComplain/ComplainSuccess/ComplainSuccess',
      'subpacks/UsuallyModule/MakeComplain/ComplainComment/ComplainComment',
      'subpacks/UsuallyModule/CheckOrder/Index/Index',
      'subpacks/UsuallyModule/CheckOrder/CheckOrder/CheckOrder',
      'subpacks/UsuallyModule/SelectCorpAgreement/SelectCorpAgreement',
      'subpacks/UsuallyModule/Agreement/BindAgreementList/BindAgreementList',
      'subpacks/UsuallyModule/HotelCommentList/HotelCommentList',
      'subpacks/UsuallyModule/AccountSecurity/AccountSecurity',
      'subpacks/UsuallyModule/AboutAtour/AboutAtour',
      'subpacks/UsuallyModule/SetNickName/SetNickName',
      'subpacks/UsuallyModule/SetTrueName/SetTrueName',
      'subpacks/UsuallyModule/SetPhone/SetPhone',
      'subpacks/UsuallyModule/SetEmail/SetEmail',
      'subpacks/HonorOfKings/HonorOfKings',
    ],
    page: {
      'subpacks/UsuallyModule/Invite/InviteDetail.html': {
        window: {
          backgroundColor: '#fafafa',
          backgroundTextStyle: 'dark',
          enablePullDownRefresh: false,
          navigationBarBackgroundColor: '#fff',
          navigationBarTextStyle: 'black',
          navigationBarTitleText: '亚朵新人礼包',
        }
      }
    },
    accountInfo: {
      appId: 'wx42c1491feb6d12a1',
      icon: 'https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png',
      nickname: '亚朵ATOUR'
    },
    global: {
      window: {
        backgroundColor: '#fafafa',
        backgroundTextStyle: 'dark',
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black',
        navigationBarTitleText: '亚朵',
      }
    },
    platform: 'mac',
    appType: 0,
    networkTimeout: {
      request: 60000,
      uploadFile: 60000,
      connectSocket: 60000,
      downloadFile: 60000,
    },
    extAppid: ''
  });
}


main()