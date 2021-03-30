$gwx_XC_27=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_27 || [];
function gz$gwx_XC_27_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_27_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_27_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_27_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_27_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_27_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_27=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_27=true;
var x=['./components/map/index.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_27_1()
var bED=_v()
_(r,bED)
if(_oz(z,0,e,s,gg)){bED.wxVkey=1
}
bED.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_27";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_27();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/map/index.wxml'] = [$gwx_XC_27, './components/map/index.wxml'];else __wxAppCode__['components/map/index.wxml'] = $gwx_XC_27( './components/map/index.wxml' );
	;__wxRoute = "components/map/index";__wxRouteBegin = true;__wxAppCurrentFile__="components/map/index.js";define("components/map/index.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(wx.webpackJsonp=wx.webpackJsonp||[]).push([[33],{1637:function(t,e,n){t.exports=n.p+"components/map/index.wxml"},2740:function(t,e,n){"use strict";n.r(e),n(2741);var o,r=n(965);for(o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o)},2741:function(t,e,n){"use strict";n(1637)},2742:function(t,e,n){},295:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t};function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var a,i=n(0),u=function(t){return t&&t.__esModule?t:{default:t}}(i);function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(){var t,e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(t=e=s(this,(t=c.__proto__||Object.getPrototypeOf(c)).call.apply(t,[this].concat(o)))).$usedState=["anonymousState__temp","anonymousState__temp3","showLocation","includePoints","latitude","longitude","markers","scale"],e.customComponents=[],s(e,t)}n(2742),function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(c,u.default.Component),o(c,[{key:"_constructor",value:function(t){(function t(e,n,o){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,n);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(o):void 0:null!==(e=Object.getPrototypeOf(e))?t(e,n,o):void 0})(c.prototype.__proto__||Object.getPrototypeOf(c.prototype),"_constructor",this).call(this,t),this.$$refs=new u.default.RefsArray}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix;var t=(f=this.__props).height,e=void 0===(c=f.latitude)?23.132:c,n=void 0===(l=f.longitude)?113.266:l,o=f.markers,r=void 0===(p=f.scale)?16:p,a=f.onCalloutTap,u=f.onMarkerTap,s=f.includePoints,c=f.showLocation,l=(f.useGoogle,(0,i.useCallback)((function(t){a&&a(t.detail.markerId)}),[a])),p=(0,i.useCallback)((function(t){u&&u(t.detail.markerId||t)}),[u]),f=(0,i.internal_inline_style)(t||0===t?{width:"100%",height:t}:{flex:1});return t=(0,i.internal_inline_style)(t||0===t?{width:"100%",height:t}:{flex:1}),this.anonymousFunc0=l,this.anonymousFunc1=p,Object.assign(this.__state,{anonymousState__temp:f,anonymousState__temp3:t,showLocation:c,includePoints:s,latitude:e,longitude:n,markers:o,scale:r}),this.__state}},{key:"anonymousFunc0",value:function(t){}},{key:"anonymousFunc1",value:function(t){}}]),o=a=c,a.$$events=["anonymousFunc0","anonymousFunc1"],a.$$componentPath="components/map/index",e.default=o,Component(n(0).default.createComponent(o))},965:function(t,e,n){"use strict";n.r(e);var o,r=n(295),a=n.n(r);for(o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e.default=a.a}},[[2740,0,1,2]]]);
},{isPage:false,isComponent:true,currentFile:'components/map/index.js'});require("components/map/index.js");