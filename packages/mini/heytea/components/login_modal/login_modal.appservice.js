$gwx_XC_24=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_24 || [];
function gz$gwx_XC_24_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_24_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_24_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_24_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
Z([[2,'||'],[[7],[3,'mobxConditionShow']],[[7],[3,'propsCodeConditionShow']]])
Z([3,'anonymousFunc0'])
Z([3,'login-modal'])
Z([3,'login-modal-content'])
Z([[2,'!'],[[7],[3,'isForce']]])
Z([[7],[3,'$compid__1667']])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_24_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_24_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_24=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_24=true;
var x=['./components/login_modal/login_modal.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_24_1()
var oVC=_v()
_(r,oVC)
if(_oz(z,0,e,s,gg)){oVC.wxVkey=1
var lWC=_v()
_(oVC,lWC)
if(_oz(z,1,e,s,gg)){lWC.wxVkey=1
var aXC=_mz(z,'view',['bindtap',2,'class',1],[],e,s,gg)
var tYC=_n('view')
_rz(z,tYC,'class',4,e,s,gg)
var eZC=_v()
_(tYC,eZC)
if(_oz(z,5,e,s,gg)){eZC.wxVkey=1
}
var b1C=_n('login-mini-content')
_rz(z,b1C,'compid',6,e,s,gg)
_(tYC,b1C)
var o2C=_n('protocol-tip')
_(tYC,o2C)
eZC.wxXCkey=1
_(aXC,tYC)
_(lWC,aXC)
}
else{lWC.wxVkey=2
}
lWC.wxXCkey=1
lWC.wxXCkey=3
}
oVC.wxXCkey=1
oVC.wxXCkey=3
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_24";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_24();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/login_modal/login_modal.wxml'] = [$gwx_XC_24, './components/login_modal/login_modal.wxml'];else __wxAppCode__['components/login_modal/login_modal.wxml'] = $gwx_XC_24( './components/login_modal/login_modal.wxml' );
	;__wxRoute = "components/login_modal/login_modal";__wxRouteBegin = true;__wxAppCurrentFile__="components/login_modal/login_modal.js";define("components/login_modal/login_modal.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(wx.webpackJsonp=wx.webpackJsonp||[]).push([[30],{1622:function(o,t,e){o.exports=e.p+"components/login_modal/login_modal.wxml"},2695:function(o,t,e){"use strict";e.r(t),e(2696);var n,r=e(950);for(n in r)"default"!==n&&function(o){e.d(t,o,(function(){return r[o]}))}(n)},2696:function(o,t,e){"use strict";e(1622)},2697:function(o,t,e){},280:function(o,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(o,t){if(Array.isArray(o))return o;if(Symbol.iterator in Object(o))return function(o,t){var e=[],n=!0,r=!1,i=void 0;try{for(var a,u=o[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!t||e.length!==t);n=!0);}catch(o){r=!0,i=o}finally{try{!n&&u.return&&u.return()}finally{if(r)throw i}}return e}(o,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(o,t,e){return t&&i(o.prototype,t),e&&i(o,e),o};function i(o,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(o,n.key,n)}}function a(o,t,e){null===o&&(o=Function.prototype);var n=Object.getOwnPropertyDescriptor(o,t);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(e):void 0:null!==(o=Object.getPrototypeOf(o))?a(o,t,e):void 0}var u=e(6),l=e(0),s=d(l),c=e(4),p=d(e(1)),f=d(e(2));function d(o){return o&&o.__esModule?o:{default:o}}function _(o,t){if(!o)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?o:t}e(2697),e(1558);var h=p.default.hosts.cdn,y=[1002,401011,-1];function m(){var o,t;!function(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}(this,m);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return(o=t=_(this,(o=m.__proto__||Object.getPrototypeOf(m)).call.apply(o,[this].concat(n)))).$usedState=["$compid__1667","mobxConditionShow","propsCodeConditionShow","isForce","cdn","title","login_modal_welcome","subtitle","login_modal_tip","user","identityPath","code","loginForce","onReLoad"],t.handleClosePop=function(o){var e;o||(o=(e=t.props).onClose,e=e.user.loginCloseAction,o&&t.props.onClose(),e())},t.customComponents=["LoginMiniContent","ProtocolTip"],_(t,o)}(function(o,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);o.prototype=Object.create(t&&t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(o,t):o.__proto__=t)})(m,l.Component),r(m,[{key:"_constructor",value:function(){a(m.prototype.__proto__||Object.getPrototypeOf(m.prototype),"_constructor",this).apply(this,arguments),this.$$refs=new s.default.RefsArray}},{key:"_createData",value:function(){var o=this;this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var t=this.$prefix,e=(0,l.genCompid)(t+"$compid__1667"),r=(d=n(e,2))[0],i=d[1],a=(m=this.__props).user,u=m.identityPath,s=m.code,c=void 0!==(_=m.loginForce)&&_,p=(m.onClose,m.onReLoad),d=(t=m.title,e=m.subtitle,a.lang),_=a.showLogin,m=(p=a.currentIdentityPath,a.isForceLogin),g=(d=(a.loginCloseAction,a=f.default.getLang(d,"login")).login_modal_welcome,a=a.login_modal_tip,u=_&&p===u,(s=s&&-1!==y.indexOf(s))?c:!!u&&m);return this.anonymousFunc0=function(){return o.handleClosePop(g)},this.anonymousFunc1=function(){return o.handleClosePop(g)},(u||s)&&l.propsManager.set({propsCodeConditionShow:s,onReLoad:this.__props.onReLoad,handleClosePop:this.handleClosePop},i,r),Object.assign(this.__state,{$compid__1667:i,mobxConditionShow:u,propsCodeConditionShow:s,isForce:g,cdn:h,title:t,login_modal_welcome:d,subtitle:e,login_modal_tip:a}),this.__state}},{key:"anonymousFunc0",value:function(o){}},{key:"anonymousFunc1",value:function(o){}}]),r=p=m,p.$$events=["anonymousFunc0","anonymousFunc1"],p.$$componentPath="components/login_modal/login_modal",r=r,r=(0,u.__decorate)([(0,c.inject)("user"),c.observer],r),t.default=r,Component(e(0).default.createComponent(r))},950:function(o,t,e){"use strict";e.r(t);var n,r=e(280),i=e.n(r);for(n in r)"default"!==n&&function(o){e.d(t,o,(function(){return r[o]}))}(n);t.default=i.a}},[[2695,0,1,2,3]]]);
},{isPage:false,isComponent:true,currentFile:'components/login_modal/login_modal.js'});require("components/login_modal/login_modal.js");