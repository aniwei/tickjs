$gwx24_XC_3=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx24_XC_3 || [];
function gz$gwx24_XC_3_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx24_XC_3_1)return __WXML_GLOBAL__.ops_cached.$gwx24_XC_3_1
__WXML_GLOBAL__.ops_cached.$gwx24_XC_3_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
Z([[2,'==='],[[7],[3,'codeType']],[1,'1']])
Z([[10],[[7],[3,'anonymousState__temp']]])
Z([3,'renderStarView'])
Z([[10],[[7],[3,'anonymousState__temp2']]])
Z([3,'renderView'])
Z(z[3])
Z([[7],[3,'$compid__990']])
Z(z[5])
Z([3,'ex-r-view'])
Z([[7],[3,'$compid__991']])
Z([[7],[3,'$compid__992']])
})(__WXML_GLOBAL__.ops_cached.$gwx24_XC_3_1);return __WXML_GLOBAL__.ops_cached.$gwx24_XC_3_1
}
__WXML_GLOBAL__.ops_set.$gwx24_XC_3=z;
__WXML_GLOBAL__.ops_init.$gwx24_XC_3=true;
var x=['./pages/member/exchange_code/exchange_result/index.wxml'];d_[x[0]]={}
d_[x[0]]["renderStarView"]=function(e,s,r,gg){
var z=gz$gwx24_XC_3_1()
var b=x[0]+':renderStarView'
r.wxVkey=b
gg.f=$gdc(f_["./pages/member/exchange_code/exchange_result/index.wxml"],"",1)
if(p_[b]){_wl(b,x[0]);return}
p_[b]=true
try{
var oB=_n('ht-common-btn')
_rz(z,oB,'compid',7,e,s,gg)
_(r,oB)
}catch(err){
p_[b]=false
throw err
}
p_[b]=false
return r
}
d_[x[0]]["renderView"]=function(e,s,r,gg){
var z=gz$gwx24_XC_3_1()
var b=x[0]+':renderView'
r.wxVkey=b
gg.f=$gdc(f_["./pages/member/exchange_code/exchange_result/index.wxml"],"",1)
if(p_[b]){_wl(b,x[0]);return}
p_[b]=true
try{
var oB=_n('view')
_rz(z,oB,'class',9,e,s,gg)
var xC=_n('ht-common-btn')
_rz(z,xC,'compid',10,e,s,gg)
_(oB,xC)
var oD=_n('ht-common-btn')
_rz(z,oD,'compid',11,e,s,gg)
_(oB,oD)
_(r,oB)
}catch(err){
p_[b]=false
throw err
}
p_[b]=false
return r
}
var m0=function(e,s,r,gg){
var z=gz$gwx24_XC_3_1()
var e2=_v()
_(r,e2)
if(_oz(z,0,e,s,gg)){e2.wxVkey=1
var b3=_v()
_(e2,b3)
if(_oz(z,1,e,s,gg)){b3.wxVkey=1
var o4=_v()
_(b3,o4)
var x5=_oz(z,3,e,s,gg)
var o6=_gd(x[0],x5,e_,d_)
if(o6){
var f7=_1z(z,2,e,s,gg) || {}
var cur_globalf=gg.f
o4.wxXCkey=3
o6(f7,f7,o4,gg)
gg.f=cur_globalf
}
else _w(x5,x[0],10,30)
}
else{b3.wxVkey=2
var c8=_v()
_(b3,c8)
var h9=_oz(z,5,e,s,gg)
var o0=_gd(x[0],h9,e_,d_)
if(o0){
var cAB=_1z(z,4,e,s,gg) || {}
var cur_globalf=gg.f
c8.wxXCkey=3
o0(cAB,cAB,c8,gg)
gg.f=cur_globalf
}
else _w(h9,x[0],13,30)
}
b3.wxXCkey=1
}
e2.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx24_XC_3";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx24_XC_3();	if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/member/exchange_code/exchange_result/index.wxml'] = [$gwx24_XC_3, './pages/member/exchange_code/exchange_result/index.wxml'];else __wxAppCode__['pages/member/exchange_code/exchange_result/index.wxml'] = $gwx24_XC_3( './pages/member/exchange_code/exchange_result/index.wxml' );
	;__wxRoute = "pages/member/exchange_code/exchange_result/index";__wxRouteBegin = true;__wxAppCurrentFile__="pages/member/exchange_code/exchange_result/index.js";define("pages/member/exchange_code/exchange_result/index.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(wx.webpackJsonp=wx.webpackJsonp||[]).push([[536],{1500:function(e,t,n){e.exports=n.p+"pages/member/exchange_code/exchange_result/index.wxml"},162:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=x(n(3)),a=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,a=!1,r=void 0;try{for(var c,u=e[Symbol.iterator]();!(o=(c=u.next()).done)&&(n.push(c.value),!t||n.length!==t);o=!0);}catch(e){a=!0,r=e}finally{try{!o&&u.return&&u.return()}finally{if(a)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(e,t,n){return t&&c(e.prototype,t),n&&c(e,n),e};function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(n):void 0:null!==(e=Object.getPrototypeOf(e))?u(e,t,n):void 0}var i=n(6),s=n(0),p=x(s),l=n(35),f=n(4),_=n(17),d=x(n(2)),g=x(n(7)),m=n(28),h=x(n(12)),y=x(n(1)),v=n(8);function x(e){return e&&e.__esModule?e:{default:e}}function b(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n(2344);var S,w=(0,v.getSrc)("/img/my/exchange_code/common_icon_done.png",-1);function T(){var e,t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,T);for(var n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t=b(this,(e=T.__proto__||Object.getPrototypeOf(T)).call.apply(e,[this].concat(o)))).$usedState=["anonymousState__temp3","anonymousState__temp4","anonymousState__temp5","IconDone","codeType","anonymousState__temp","anonymousState__temp2"],t.handleStorageData=function(e){e&&(t.starCodeData=e,(0,_.removeStorage)("exchangeResult"))},t.handleReturnMe=function(){p.default.switchTab({url:y.default.routes.profile})},t.customComponents=["HtCommonBtn"],b(t,e)}(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)})(T,s.Component),r(T,[{key:"_constructor",value:function(){u(T.prototype.__proto__||Object.getPrototypeOf(T.prototype),"_constructor",this).apply(this,arguments),this.conf={navigationBarTitleText:""},this.codeType="",this.starCodeData={name:"",coupon:[]},this.$$refs=new p.default.RefsArray}},{key:"componentWillMount",value:(S=function(e){return function(){var t=e.apply(this,arguments);return new Promise((function(e,n){return function o(a,r){try{var c=t[a](r),u=c.value}catch(a){return void n(a)}if(!c.done)return Promise.resolve(u).then((function(e){o("next",e)}),(function(e){o("throw",e)}));e(u)}("next")}))}}(o.default.mark((function e(){var t;return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(e.prev=0,m.setTitle)(d.default.getLang(g.default.lang,"exchange_code").exchange_success),this.codeType=this.$router.params&&this.$router.params.codeType,e.next=5,(0,_.getStorage)("exchangeResult");case 5:t=e.sent,this.handleStorageData(t),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),h.default.pointScriptError({error:e.t0,page:"/pages/member/exchange_code/exchange_result/index"});case 12:case"end":return e.stop()}}),e,this,[[0,9]])}))),function(){return S.apply(this,arguments)})},{key:"handleRedirectTo",value:function(e){e&&p.default.redirectTo({url:e})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=this.codeType,n=this.starCodeData.name,o="1"===this.codeType?this._createStarViewData(e+"fjgzzzzzzz")():null,a=this._createViewData(e+"fjhzzzzzzz")(),r=d.default.getLang(g.default.lang,"exchange_code").common_congratulations;return e=d.default.getLang(g.default.lang,"exchange_code").exchange_success_exchange,n="1"===this.codeType?""+d.default.getLang(g.default.lang,"exchange_code").common_memberstar+n:d.default.getLang(g.default.lang,"exchange_code").common_heyTea_coupon,Object.assign(this.__state,{anonymousState__temp3:r,anonymousState__temp4:e,anonymousState__temp5:n,IconDone:w,codeType:t,anonymousState__temp:o,anonymousState__temp2:a}),this.__state}},{key:"_createStarViewData",value:function(e){var t=this;return function(){var n=(0,s.genCompid)(e+"$compid__990"),o=(p=a(n,2))[0],r=p[1],c=t.starCodeData.coupon,u={backgroundColor:"#fff"},i=d.default.getLang(g.default.lang,"exchange_code").exchange_succ_tips,p=(n=d.default.getLang(g.default.lang,"exchange_code").exchange_get_tip,c.map((function(e,t){var n=(e={$original:(0,s.internal_get_original)(e)}).$original;return{name:n.name,amount:n.amount,$loopState__temp10:"coupons-item-"+t,$original:e.$original}})));return s.propsManager.set({text:"查看我的会员身份",onClick:t.handleReturnMe,plain:!0,compStyle:u},r,o),{anonymousState__temp6:u,anonymousState__temp7:i,anonymousState__temp8:n,loopArray366:p,$compid__990:r,coupon:c}}}},{key:"_createViewData",value:function(e){var t=this;return function(){var n=(0,s.genCompid)(e+"$compid__991"),o=(p=a(n,2))[0],r=p[1],c=(0,s.genCompid)(e+"$compid__992"),u=(l=a(c,2))[0],i=l[1],p=(n=(f=y.default.routes).exchangeArea,f.coupon),l=(c=d.default.getLang(g.default.lang,"exchange_code").exchange_go_coupons,{backgroundColor:"#fff"}),f=d.default.getLang(g.default.lang,"exchange_code").exchange_again_coupon;return s.propsManager.set({text:c,onClick:t.handleRedirectTo.bind(t,p),plain:!0,btStyle:"dark"},r,o),s.propsManager.set({plain:!0,compStyle:l,text:f,onClick:t.handleRedirectTo.bind(t,n+"?type=coupon")},i,u),{anonymousState__temp11:c,anonymousState__temp12:l,anonymousState__temp13:f,$compid__991:r,$compid__992:i}}}}]),r=v=T,v.$$events=[],v.$$componentPath="pages/member/exchange_code/exchange_result/index",r=r,(0,i.__decorate)([l.observable],r.prototype,"codeType",void 0),(0,i.__decorate)([l.observable],r.prototype,"starCodeData",void 0),r=(0,i.__decorate)([f.observer],r),t.default=r,Component(n(0).default.createComponent(r,!0))},2342:function(e,t,n){"use strict";n.r(t),n(2343);var o,a=n(831);for(o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o)},2343:function(e,t,n){"use strict";n(1500)},2344:function(e,t,n){},831:function(e,t,n){"use strict";n.r(t);var o,a=n(162),r=n.n(a);for(o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t.default=r.a}},[[2342,0,1,2,3]]]);
},{isPage:true,isComponent:true,currentFile:'pages/member/exchange_code/exchange_result/index.js'});require("pages/member/exchange_code/exchange_result/index.js");