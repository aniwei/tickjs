$gwx24_XC_28=function(_,_v,_n,_p,_s,_wp,_wl,$gwn,$gwl,$gwh,wh,$gstack,$gwrt,gra,grb,TestTest,wfor,_ca,_da,_r,_rz,_o,_oz,_1,_1z,_2,_2z,_m,_mz,nv_getDate,nv_getRegExp,nv_console,nv_parseInt,nv_parseFloat,nv_isNaN,nv_isFinite,nv_decodeURI,nv_decodeURIComponent,nv_encodeURI,nv_encodeURIComponent,$gdc,nv_JSON,_af,_gv,_ai,_grp,_gd,_gapi,$ixc,_ic,_w,_ev,_tsd){return function(path,global){
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
var z=__WXML_GLOBAL__.ops_set.$gwx24_XC_28 || [];
function gz$gwx24_XC_28_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx24_XC_28_1)return __WXML_GLOBAL__.ops_cached.$gwx24_XC_28_1
__WXML_GLOBAL__.ops_cached.$gwx24_XC_28_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([[7],[3,'$taroCompReady']])
Z([3,'message-center-footer-container'])
Z([[10],[[7],[3,'anonymousState__temp']]])
Z([3,'renderContent'])
Z(z[3])
Z([[7],[3,'loading']])
Z([3,'message-center-footer__txt'])
Z([a,[[7],[3,'_$anonymousState__temp']]])
Z([[2,'&&'],[[2,'!'],[[7],[3,'loading']]],[[7],[3,'loadFail']]])
Z(z[6])
Z([a,[[7],[3,'_$anonymousState__temp2']]])
Z([[2,'&&'],[[2,'!'],[[7],[3,'loading']]],[[7],[3,'noMore']]])
Z(z[6])
Z([a,[[7],[3,'_$anonymousState__temp3']]])
})(__WXML_GLOBAL__.ops_cached.$gwx24_XC_28_1);return __WXML_GLOBAL__.ops_cached.$gwx24_XC_28_1
}
__WXML_GLOBAL__.ops_set.$gwx24_XC_28=z;
__WXML_GLOBAL__.ops_init.$gwx24_XC_28=true;
var x=['./pages/member/my_points/footer_tip.wxml'];d_[x[0]]={}
d_[x[0]]["renderContent"]=function(e,s,r,gg){
var z=gz$gwx24_XC_28_1()
var b=x[0]+':renderContent'
r.wxVkey=b
gg.f=$gdc(f_["./pages/member/my_points/footer_tip.wxml"],"",1)
if(p_[b]){_wl(b,x[0]);return}
p_[b]=true
try{
var oB=_v()
_(r,oB)
if(_oz(z,5,e,s,gg)){oB.wxVkey=1
var xC=_n('text')
_rz(z,xC,'class',6,e,s,gg)
var oD=_oz(z,7,e,s,gg)
_(xC,oD)
_(oB,xC)
}
else if(_oz(z,8,e,s,gg)){oB.wxVkey=2
var fE=_n('text')
_rz(z,fE,'class',9,e,s,gg)
var cF=_oz(z,10,e,s,gg)
_(fE,cF)
_(oB,fE)
}
else if(_oz(z,11,e,s,gg)){oB.wxVkey=3
var hG=_n('text')
_rz(z,hG,'class',12,e,s,gg)
var oH=_oz(z,13,e,s,gg)
_(hG,oH)
_(oB,hG)
}
else{oB.wxVkey=4
var cI=_n('view')
_(oB,cI)
}
oB.wxXCkey=1
}catch(err){
p_[b]=false
throw err
}
p_[b]=false
return r
}
var m0=function(e,s,r,gg){
var z=gz$gwx24_XC_28_1()
var eFP=_v()
_(r,eFP)
if(_oz(z,0,e,s,gg)){eFP.wxVkey=1
var bGP=_n('view')
_rz(z,bGP,'class',1,e,s,gg)
var oHP=_v()
_(bGP,oHP)
var xIP=_oz(z,3,e,s,gg)
var oJP=_gd(x[0],xIP,e_,d_)
if(oJP){
var fKP=_1z(z,2,e,s,gg) || {}
var cur_globalf=gg.f
oHP.wxXCkey=3
oJP(fKP,fKP,oHP,gg)
gg.f=cur_globalf
}
else _w(xIP,x[0],3,22)
_(eFP,bGP)
}
eFP.wxXCkey=1
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
;g="$gwx24_XC_28";var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(err)
}
;g="";
return root;
}
}
}
}(__g.a,__g.b,__g.c,__g.d,__g.e,__g.f,__g.g,__g.h,__g.i,__g.j,__g.k,__g.l,__g.m,__g.n,__g.o,__g.p,__g.q,__g.r,__g.s,__g.t,__g.u,__g.v,__g.w,__g.x,__g.y,__g.z,__g.A,__g.B,__g.C,__g.D,__g.E,__g.F,__g.G,__g.H,__g.I,__g.J,__g.K,__g.L,__g.M,__g.N,__g.O,__g.P,__g.Q,__g.R,__g.S,__g.T,__g.U,__g.V,__g.W,__g.X,__g.Y,__g.Z,__g.aa);if(__vd_version_info__.delayedGwx||false)$gwx24_XC_28();		__wxAppCode__['pages/member/my_points/footer_tip.wxss'] = setCssToHead([".",[1],"message-center-footer-container{display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;padding-top:",[0,33],";padding-bottom:",[0,33],";-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-sizing:border-box;box-sizing:border-box}\n.",[1],"message-center-footer__txt{font-size:",[0,24],";height:",[0,34],";line-height:",[0,34],";font-weight:400;text-align:center;color:#c2c2c2}\n",],undefined,{path:"./pages/member/my_points/footer_tip.wxss"});
		if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/member/my_points/footer_tip.wxml'] = [ $gwx24_XC_28, './pages/member/my_points/footer_tip.wxml' ];
		else __wxAppCode__['pages/member/my_points/footer_tip.wxml'] = $gwx24_XC_28( './pages/member/my_points/footer_tip.wxml' );
		