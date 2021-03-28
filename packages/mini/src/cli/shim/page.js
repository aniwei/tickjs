__wxRoute = inject.route;
__wxRouteBegin = true
__wxAppCurrentFile__ = inject.file;	

define(inject.file, function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket,Reporter,webkit,WeixinJSCore){
  importScripts('/@app/code?r=' + __wxRoute);
});
require(inject.file);