
declare export type Navigator = {
  userAgent: string
}

declare export type Console = {
  log?: Function;
  warn?: Function;
  error?: Function;
}

declare export type WeixinJSCore = {
  invokeHandler: Function;
  publishHandler: Function;
}