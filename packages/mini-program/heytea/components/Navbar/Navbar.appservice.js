$gwx_XC_0=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx_XC_0 || [];
function gz$gwx_XC_0_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_XC_0_1)return __WXML_GLOBAL__.ops_cached.$gwx_XC_0_1
__WXML_GLOBAL__.ops_cached.$gwx_XC_0_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
Z([[7],[3,'isText']])
})(__WXML_GLOBAL__.ops_cached.$gwx_XC_0_1);return __WXML_GLOBAL__.ops_cached.$gwx_XC_0_1
}
__WXML_GLOBAL__.ops_set.$gwx_XC_0=z;
__WXML_GLOBAL__.ops_init.$gwx_XC_0=true;
var x=['./components/Navbar/Navbar.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_XC_0_1()
var oB=_v()
_(r,oB)
if(_oz(z,0,e,s,gg)){oB.wxVkey=1
var xC=_v()
_(oB,xC)
if(_oz(z,1,e,s,gg)){xC.wxVkey=1
}
xC.wxXCkey=1
}
oB.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx_XC_0";var main=e_[path].f
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
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx_XC_0();	if (__vd_version_info__.delayedGwx) __wxAppCode__['components/Navbar/Navbar.wxml'] = [$gwx_XC_0, './components/Navbar/Navbar.wxml'];else __wxAppCode__['components/Navbar/Navbar.wxml'] = $gwx_XC_0( './components/Navbar/Navbar.wxml' );
	;__wxRoute = "components/Navbar/Navbar";__wxRouteBegin = true;__wxAppCurrentFile__="components/Navbar/Navbar.js";define("components/Navbar/Navbar.js",function(require,module,exports,window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
(wx.webpackJsonp=wx.webpackJsonp||[]).push([[6],{1200:function(t,e,o){"use strict";o.r(e);var n,r=o(529),i=o.n(r);for(n in r)"default"!==n&&function(t){o.d(e,t,(function(){return r[t]}))}(n);e.default=i.a},1874:function(t,e,o){t.exports=o.p+"components/Navbar/Navbar.wxml"},3437:function(t,e,o){"use strict";o.r(e),o(3438);var n,r=o(1200);for(n in r)"default"!==n&&function(t){o.d(e,t,(function(){return r[t]}))}(n)},3438:function(t,e,o){"use strict";o(1874)},3439:function(t,e,o){},529:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e,o){return e&&r(t.prototype,e),o&&r(t,o),t};function r(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var i=o(0),a=u(i),s=u(o(1));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}o(3439);var f=s.default.hosts.cdn,l=s.default.routes;function p(){var t,e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(t=e=c(this,(t=p.__proto__||Object.getPrototypeOf(p)).call.apply(t,[this].concat(n)))).$usedState=["isPosition","paddingTop","fontColor","bgColor","isHome","cdn","isText","titleTxt"],e.back=function(){a.default.navigateBack()},e.home=function(){a.default.switchTab({url:l.home})},e.customComponents=[],c(e,t)}(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)})(p,i.Component),n(p,[{key:"_constructor",value:function(t){(function t(e,o,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(e=Object.getPrototypeOf(e))?t(e,o,n):void 0})(p.prototype.__proto__||Object.getPrototypeOf(p.prototype),"_constructor",this).call(this,t),this.state={paddingTop:0},this.$$refs=new a.default.RefsArray}},{key:"componentWillMount",value:function(){var t=this;a.default.getSystemInfo({}).then((function(e){t.setState({paddingTop:e.statusBarHeight||0})}))}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix,this.__state.paddingTop;var t=void 0!==(n=(i=this.__props).isPosition)&&n,e=void 0!==(r=i.isHome)&&r,o=i.fontColor,n=i.bgColor,r=void 0!==(r=i.isText)&&r,i=void 0===(i=i.titleTxt)?"":i;return this.anonymousFunc0=e?this.home:this.back,Object.assign(this.__state,{isPosition:t,fontColor:o,bgColor:n,isHome:e,cdn:f,isText:r,titleTxt:i}),this.__state}},{key:"anonymousFunc0",value:function(t){}}]),n=i=p,i.$$events=["anonymousFunc0","home","back"],i.$$componentPath="components/Navbar/Navbar",n=n,e.default=n,Component(o(0).default.createComponent(n))}},[[3437,0,1,2,3]]]);
},{isPage:false,isComponent:true,currentFile:'components/Navbar/Navbar.js'});require("components/Navbar/Navbar.js");