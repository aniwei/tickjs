$gwx_XC_127=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
if(typeof global==='undefined'){if (typeof __GWX_GLOBAL__==='undefined')global={};else global=__GWX_GLOBAL__;}if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_127 || [];
function gz$gwx_XC_127_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_127_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_127_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_127_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_127_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_127_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_127=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_127=true;
var x=['./pages/index/_index/subscription/index.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_127_1()
var xW4=_v()
_(r,xW4)
if(_oz(z,0,e,s,gg)){xW4.wxVkey=1
}
xW4.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_127";var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
;g="";
return root;
}
}
}
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_127();	if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/index/_index/subscription/index.wxml'] = [$gwx_XC_127, './pages/index/_index/subscription/index.wxml'];else __wxAppCode__['pages/index/_index/subscription/index.wxml'] = $gwx_XC_127( './pages/index/_index/subscription/index.wxml' );
	;__wxRoute = "pages/index/_index/subscription/index";__wxRouteBegin = true;__wxAppCurrentFile__="pages/index/_index/subscription/index.js";define("pages/index/_index/subscription/index.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(wx.webpackJsonp=wx.webpackJsonp||[]).push([[368],{1232:function(t,e,i){"use strict";i.r(e);var n,o=i(561),s=i.n(o);for(n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e.default=s.a},1908:function(t,e,i){t.exports=i.p+"pages/index/_index/subscription/index.wxml"},3531:function(t,e,i){"use strict";i.r(e),i(3532);var n,o=i(1232);for(n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n)},3532:function(t,e,i){"use strict";i(1908)},3533:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.setUserSubscribeNonDisturbing=e.cancelUserSubscribe=e.setUserSubscribe=e.getUserSubscribed=void 0;var n=i(30);e.getUserSubscribed=function(t){return(0,n.httpPost)("/api/service-portal/vip/user/subscribe/result",t)},e.setUserSubscribe=function(t){return(0,n.httpPost)("/api/service-portal/vip/user/subscribe",t)},e.cancelUserSubscribe=function(t){return(0,n.httpPost)("/api/service-portal/vip/user/subscribe/cancel",t)},e.setUserSubscribeNonDisturbing=function(t){return(0,n.httpPost)("/api/service-portal/vip/user/subscribe/popup/cancel",t)}},3534:function(t,e,i){},561:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=_(i(3)),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=function(t,e,i){return e&&r(t.prototype,e),i&&r(t,i),t};function r(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var a=i(6),u=i(0),c=_(u),p=i(4),l=i(3533),d=i(28),b=i(19),f=_(i(5)),h=i(60),g=_(i(1)),y=_(i(2));function _(t){return t&&t.__esModule?t:{default:t}}function v(t){return function(){var e=t.apply(this,arguments);return new Promise((function(t,i){return function n(o,s){try{var r=e[o](s),a=r.value}catch(o){return void i(o)}if(!r.done)return Promise.resolve(a).then((function(t){n("next",t)}),(function(t){n("throw",t)}));t(a)}("next")}))}}function S(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}i(3534);var m=g.default.hosts.cdn;function k(){var t,e,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,k);for(var o=arguments.length,s=Array(o),r=0;r<o;r++)s[r]=arguments[r];return(t=e=S(this,(t=k.__proto__||Object.getPrototypeOf(k)).call.apply(t,[this].concat(s)))).$usedState=["anonymousState__temp","cdn","langObj","contextLang","subscriptionType","isClickHide","isSubscribed","textLang","user","shoppingBagStore"],e.submitFormId=function(t){(t=t.detail.formId)&&"the formId is a mock one"!==t&&(0,b.collectFormId)({formId:t})},e.checkShowModel=function(t){var i=(p=t||e.props).curCityNoShop,n=p.shoppingBagStore,o=p.user.lang,s=y.default.getLang(o,"index"),r=(l=e.state).subscriptionType,a=l.contextLang,u=void 0!==(c=(b=n||{}).shopIsComingSoon)&&c,c=(t=void 0!==(d=b.shopIsClosingForNight)&&d,o=void 0!==(p=b.shopIsBusy)&&p,void 0!==(l=b.shopIsBusyButForPreMade)&&l),p=void 0!==(d=b.shopIsTakeawayBusy)&&d,l=(b.shop||{}).id,d=0,b="";e.switchShopCallback(n),(o||c)&&(d=4,b=s.subscription_tips_busy),p&&(d=5,b=s.subscription_tips_takeaway),t&&(d=3,b=s.subscription_tips_closing),u&&(d=2,b=s.subscription_tips_comingsoon),i&&(d=1,b=s.subscription_tips_city_no_shop),0===d&&e.setState({isClickHide:!1}),e.getSubscription(d,l),r!==d&&e.setState({subscriptionType:d}),b!==a&&e.setState({contextLang:b,textLang:s.subscription_tips_busy})},e.setSubscription=function(){e.barrierGuest()||(e.onClickSubscription(),(0,h.requestSubscribeMessage)(6))},e.onClickSubscription=v(n.default.mark((function t(){var o,s,r,a,u,c;return n.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=e.state.subscriptionType,c=e.props,u=c.shoppingBagStore,r=c.user,a=r.lang,s=y.default.getLang(a,"index"),r=void 0===(c=(u||{}).shop)?{id:0}:c,a={},u={},f.default.showLoading({title:s.common_loading}),1===o)return t.next=11,(0,d.getLocation)();t.next=14;break;case 11:c=t.sent,a.tag="shop.new.local",c&&c.longitude&&(a.meta={longitude:c.longitude,latitude:c.latitude});case 14:if(2===o&&(a.tag="shop.new.online",a.meta={shopId:r&&r.id||0}),3===o&&(a.tag="shop.in.work",a.meta={shopId:r&&r.id||0}),4===o&&(a.tag="shop.takeaway.open",a.meta={shopId:r&&r.id||0}),5===o&&(a.tag="shop.takeout.open",a.meta={shopId:r&&r.id||0}),o)return t.next=21,(0,l.setUserSubscribe)(a);t.next=23;break;case 21:u=t.sent,f.default.hideLoading();case 23:if(!u||0!==u.code){t.next=28;break}e.setState({isSubscribed:1}),f.default.showToast({icon:"none",title:s.subscription_open_tips}),t.next=32;break;case 28:if(u&&400028===u.code)return f.default.showToast({icon:"none",title:s.subscription_get_phone_tips}),t.abrupt("return");t.next=31;break;case 31:f.default.showToast({icon:"none",title:s.subscription_api_set_fail_tips});case 32:case"end":return t.stop()}}),t,i)}))),e.getSubscription=v(n.default.mark((function t(){var o,s,r,a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,u=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return n.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o={},e.isSetting&&e.isSettingType===a)return t.abrupt("return");t.next=3;break;case 3:if(e.isSettingType=a||0,e.isSetting=!0,setTimeout((function(){e.isSetting=!1}),2e3),1===a)return o.tag="shop.new.local",t.next=10,(0,d.getLocation)();t.next=16;break;case 10:if(!(s=t.sent)||!s.longitude){t.next=15;break}o.meta={longitude:s.longitude,latitude:s.latitude},t.next=16;break;case 15:return t.abrupt("return");case 16:if(2===a&&(o.tag="shop.new.online",o.meta={shopId:u||0}),3===a&&(o.tag="shop.in.work",o.meta={shopId:u||0}),4===a&&(o.tag="shop.takeaway.open",o.meta={shopId:u||0}),5===a&&(o.tag="shop.takeout.open",o.meta={shopId:u||0}),a)return t.next=23,(0,l.getUserSubscribed)(o);t.next=30;break;case 23:if(t.t0=t.sent,t.t0){t.next=26;break}t.t0={};case 26:r=t.t0,r=((void 0===(r=(s=r||{}).data)?{}:r)||{}).subscribe,0===(void 0===(s=s.code)?404:s)&&"boolean"==typeof r&&e.setState({isSubscribed:r?1:2});case 30:case"end":return t.stop()}}),t,i)}))),e.clickCancelCallback=function(){e.setState({isClickHide:!0})},e.isShowModel=function(){var t=e.state,i=t.isClickHide,n=t.isSubscribed;return!(!t.subscriptionType||i||2!==n)},e.barrierGuest=function(){var t=(i=e.props.user).isGuest,i=i.checkLoginPipeline;return!!t&&(i({triggerPath:g.default.routes.index}),!0)},e.customComponents=[],S(e,t)}g.default.eventNames,function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(k,u.Component),s(k,[{key:"_constructor",value:function(t){(function t(e,i,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,i);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(n):void 0:null!==(e=Object.getPrototypeOf(e))?t(e,i,n):void 0})(k.prototype.__proto__||Object.getPrototypeOf(k.prototype),"_constructor",this).call(this,t),this.shopId=0,this.isSetting=!1,this.isSettingType=0,this.state={subscriptionType:0,isClickHide:!1,isSubscribed:0,contextLang:"",textLang:""},this.$$refs=new c.default.RefsArray}},{key:"componentWillReceiveProps",value:function(t){this.checkShowModel(t)}},{key:"switchShopCallback",value:function(t){var e=(i=this.state).isClickHide,i=i.isSubscribed;"object"===(void 0===t?"undefined":o(t))&&((t=void 0===(t=((t||{}).shop||{}).id)?0:t)===this.shopId&&i||(this.shopId=t||0,e&&this.setState({isClickHide:!1,isSubscribed:0})))}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix;var t=((e=this.__state).contextLang,e.textLang),e=this.__props.user.lang;return t!==(e=y.default.getLang(e,"index")).subscription_tips_busy&&this.checkShowModel(),t="b-subscription-index"+(this.isShowModel()?" b-subscription-index-active":""),Object.assign(this.__state,{anonymousState__temp:t,cdn:m,langObj:e}),this.__state}}]),s=u=k,u.$$events=["setSubscription","submitFormId","clickCancelCallback"],u.$$componentPath="pages/index/_index/subscription/index",s=s,s=(0,a.__decorate)([(0,p.inject)("shoppingBagStore","user"),p.observer],s),e.default=s,Component(i(0).default.createComponent(s))}},[[3531,0,1,2,3]]]);
},{isPage:false,isComponent:true,currentFile:'pages/index/_index/subscription/index.js'});require("pages/index/_index/subscription/index.js");