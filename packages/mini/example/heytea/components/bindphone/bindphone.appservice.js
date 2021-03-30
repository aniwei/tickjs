$gwx_XC_2=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_2 || [];
function gz$gwx_XC_2_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_2_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_2_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_2_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
Z([3,'true'])
Z([[2,'+'],[[2,'+'],[1,'bind-phone-modal'],[1,'  ']],[[2,'?:'],[[7],[3,'showModal']],[1,''],[1,'bind-phone-container-z_dis']]])
Z([3,'bind-phone-container'])
Z([[7],[3,'haveClose']])
Z([[7],[3,'phone_exist']])
Z([[7],[3,'code_err']])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_2_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_2_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_2=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_2=true;
var x=['./components/bindphone/bindphone.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_2_1()
var cI=_v()
_(r,cI)
if(_oz(z,0,e,s,gg)){cI.wxVkey=1
var oJ=_mz(z,'view',['catchtouchmove',1,'class',1],[],e,s,gg)
var lK=_n('view')
_rz(z,lK,'class',3,e,s,gg)
var aL=_v()
_(lK,aL)
if(_oz(z,4,e,s,gg)){aL.wxVkey=1
}
var tM=_v()
_(lK,tM)
if(_oz(z,5,e,s,gg)){tM.wxVkey=1
}
var eN=_v()
_(lK,eN)
if(_oz(z,6,e,s,gg)){eN.wxVkey=1
}
aL.wxXCkey=1
tM.wxXCkey=1
eN.wxXCkey=1
_(oJ,lK)
_(cI,oJ)
}
cI.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_2";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_2();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/bindphone/bindphone.wxml'] = [$gwx_XC_2, './components/bindphone/bindphone.wxml'];else __wxAppCode__['components/bindphone/bindphone.wxml'] = $gwx_XC_2( './components/bindphone/bindphone.wxml' );
	;__wxRoute = "components/bindphone/bindphone";__wxRouteBegin = true;__wxAppCurrentFile__="components/bindphone/bindphone.js";define("components/bindphone/bindphone.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(wx.webpackJsonp=wx.webpackJsonp||[]).push([[8],{1171:function(e,t,n){"use strict";n.r(t);var o,a=n(500),s=n.n(a);for(o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t.default=s.a},1843:function(e,t,n){e.exports=n.p+"components/bindphone/bindphone.wxml"},3351:function(e,t,n){"use strict";n.r(t),n(3352);var o,a=n(1171);for(o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o)},3352:function(e,t,n){"use strict";n(1843)},3353:function(e,t,n){},500:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=h(n(3)),a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},s=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var u=n(0),i=h(u),c=n(19),l=h(n(13)),d=h(n(1)),p=h(n(2)),_=h(n(7)),f=h(n(12));function h(e){return e&&e.__esModule?e:{default:e}}function m(e){return function(){var t=e.apply(this,arguments);return new Promise((function(e,n){return function o(a,s){try{var r=t[a](s),u=r.value}catch(a){return void n(a)}if(!r.done)return Promise.resolve(u).then((function(e){o("next",e)}),(function(e){o("throw",e)}));e(u)}("next")}))}}function b(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}n(3353);var g=d.default.hosts.cdn,v=d.default.eventNames,y=[{zone_code:"86",zone:"中国大陆"},{zone_code:"852",zone:"中国香港"},{zone_code:"853",zone:"中国澳门"},{zone_code:"886",zone:"中国台湾"},{zone_code:"65",zone:"新加坡"}];function w(){var e,t,n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,w);for(var s=arguments.length,r=Array(s),u=0;u<s;u++)r[u]=arguments[u];return(e=t=b(this,(e=w.__proto__||Object.getPrototypeOf(w)).call.apply(e,[this].concat(r)))).$usedState=["anonymousState__temp","anonymousState__temp2","anonymousState__temp3","anonymousState__temp4","anonymousState__temp5","anonymousState__temp6","anonymousState__temp7","anonymousState__temp8","anonymousState__temp9","showModal","haveClose","cdn","zoneData","phoneNumber","phone_exist","smsCode","countdown","code_err","zone_code","show","closeAction","phoneHasError","birthday","sureAction","phone"],t.clickClose=function(){var e=t.props.closeAction;t.setState({showModal:!1}),e&&e()},t.getCode=function(){var e=(a=t.state).phoneNumber,n=a.countdown,o=a.zone_code,a=t.props.phoneHasError,s=_.default.lang;0<=n||(null!==(n=e&&e.replace(/\s+/g,""))&&""!==n?(t.setState({phone_exist:!1}),o={phone:e,zone:o},a&&(o.phoneHasError=a),(0,c.getSmsCodeJava)(o).then((function(e){var n=e.code;e=e.msg,0===n?(i.default.showToast({title:""+p.default.getLang(s,"").common_send_success,icon:"none"}),t.setState({code_err:!1,smsCode:""}),t.setCountDown(60),t.startCountDown()):400018===n?t.setState({phone_exist:!0}):i.default.showToast({title:e,icon:"none"})})).catch((function(e){f.default.pointScriptError({error:e,page:"src/components/bindphone/bindphone.tsx"})}))):i.default.showToast({title:p.default.getLang(s,"settlement").sett_null_phone_toast,icon:"none"}))},t.setCountDown=function(e){t.setState({countdown:e})},t.inputPhone=function(e){t.setState({phoneNumber:e.detail.value})},t.inputCode=function(e){t.setState({smsCode:e.detail.value})},t.seletedZone=function(e){e=e.detail.value,e=y[parseInt(e)].zone_code,t.setState({zone_code:e})},t.confirm=function(){var e,s,r=(h=t.state).phoneNumber,u=void 0===(s=h.smsCode)?"":s,d=void 0===(y=h.zone_code)?"":y,h=(s=t.props).phoneHasError,b=s.birthday,g=s.sureAction,y=_.default.lang,w=_.default.setUser,S=_.default.userInfo;null!==(s=r&&r.replace(/\s+/g,""))&&""!==s?""!==u?(t.setState({code_err:!1}),d={phone:r,smsCode:u,phoneHasError:h,zone:d},(0,c.bindPoneJava)(d).then((e=m(o.default.mark((function e(s){var c,d;return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d=s.code,c=s.msg,0===d?(t.resetState(),w(a({},S,{bindPhone:!0,phone:r})),g&&g(),i.default.showToast({title:""+p.default.getLang(_.default.lang,"bindPhone").bind_phone_success,icon:"none"})):400021===d?t.setState({code_err:!0}):400013===d?i.default.showToast({title:""+p.default.getLang(_.default.lang,"bindPhone").bind_phone_send_frequently,icon:"none"}):400014===d?i.default.showToast({title:""+p.default.getLang(_.default.lang,"bindPhone").bind_phone_send_limit,icon:"none"}):400037===d?(d={phone:r,smsCode:u,birthday:b},l.default.getInstance().events.trigger(v.selectBirthday,d)):i.default.showToast({title:c,icon:"none"});case 2:case"end":return e.stop()}}),e,n)}))),function(t){return e.apply(this,arguments)})).catch((function(e){f.default.pointScriptError({error:e,page:"src/components/bindphone/bindphone.tsx"})}))):i.default.showToast({title:p.default.getLang(y,"").bind_phone_null_code_toast,icon:"none"}):i.default.showToast({title:p.default.getLang(y,"settlement").sett_null_phone_toast,icon:"none"})},t.resetState=function(){t.setState({phoneNumber:"",smsCode:"",countdown:-1,zone_code:y[0].zone_code,code_err:!1,phone_exist:!1,showModal:!1})},t.customComponents=[],b(t,e)}(function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(w,u.Component),s(w,[{key:"_constructor",value:function(e){(function e(t,n,o){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);return void 0!==a?"value"in a?a.value:void 0!==(a=a.get)?a.call(o):void 0:null!==(t=Object.getPrototypeOf(t))?e(t,n,o):void 0})(w.prototype.__proto__||Object.getPrototypeOf(w.prototype),"_constructor",this).call(this,e),this.state={phoneNumber:"",smsCode:"",countdown:-1,zone_code:y[0].zone_code,phone_exist:!1,code_err:!1,showModal:this.props.show},this.$$refs=new i.default.RefsArray}},{key:"componentWillReceiveProps",value:function(e){this.setState({showModal:e.show,phoneNumber:e.phone})}},{key:"startCountDown",value:function(){var e=this;this.interval=setInterval((function(){var t=e.state.countdown;0<=t?e.setState({countdown:t-1}):(e.setState({smsCode:"",code_err:!1}),e.interval&&clearInterval(e.interval))}),1e3)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix,this.__state.showModal;var e=this.__props.haveClose,t=((c=this.__state).phoneNumber,c.smsCode,c.countdown),n=(c.zone_code,c.phone_exist),o=c.code_err,a=_.default.lang,s=p.default.getLang(a,"").common_tips,r=p.default.getLang(a,"bindPhone").bind_phone_content4,u=p.default.getLang(a,"bindPhone").bind_phone_placeholder,i=n?p.default.getLang(a,"bindPhone").bind_phone_exist_tip:null,c=p.default.getLang(a,"bindPhone").bind_phone_code_placeholder;return n=0<t?""+p.default.getLang(a,"bindPhone").bind_phone_resend:null,t=p.default.getLang(a,"").common_get_verification_code,o=o?p.default.getLang(a,"").common_error_code:null,a=p.default.getLang(a,"").common_confirm,Object.assign(this.__state,{anonymousState__temp:s,anonymousState__temp2:r,anonymousState__temp3:u,anonymousState__temp4:i,anonymousState__temp5:c,anonymousState__temp6:n,anonymousState__temp7:t,anonymousState__temp8:o,anonymousState__temp9:a,haveClose:e,cdn:g,zoneData:y}),this.__state}}]),s=u=w,u.$$events=["clickClose","seletedZone","inputPhone","inputCode","getCode","confirm"],u.$$componentPath="components/bindphone/bindphone",s=s).defaultProps={haveClose:!0,phone:"",closeAction:function(){},phoneHasError:!1},t.default=s,Component(n(0).default.createComponent(s))}},[[3351,0,1,2,3]]]);
},{isPage:false,isComponent:true,currentFile:'components/bindphone/bindphone.js'});require("components/bindphone/bindphone.js");