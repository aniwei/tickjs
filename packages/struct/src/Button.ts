import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum ButtonDataStruct {
  SIZE = NextDataStruct.NEXT,
  TYPE,
  PLAIN,
  DISABLED,
  LOADING,
  FORM_TYPE,
  OPEN_TYPE,
  HOVER_CLASS,
  HOVER_STOP_PROPAGATION,
  HOVER_START_TIME,
  HOVER_STAY_TIME,
  LANG,
  SESSION_FORM,
  SEND_MESSAGE_TITLE,
  SEND_MESSAGE_PATH,
  SEND_MESSAGE_IMG,
  APP_PARAMETER,
  SHOW_MESSAGE_CARD,
  
  GET_USERINFO,
  GET_PHONENUMBER,
  CONTACT,
  ERROR,
  OPEN_SETTING,
  LAUNCH_APP,

  TAP,
  LONG_TAP,
  LONG_PRESS,
  
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
  TOUCH_FORCE_CHANGE,

  TRANSITION_START,
  TRANSITION_ITERATION,
  TRANSITION_END,

  ANIMATION_START,
  ANIMATION_ITERATION,
  ANIMATION_END
}

export const buttonDefaultProps = [
  ['size', ButtonDataStruct.SIZE, quotate('default'), String],
  ['type', ButtonDataStruct.TYPE, quotate('default'), String],
  ['plain', ButtonDataStruct.PLAIN, false, Boolean], 
  ['disabled', ButtonDataStruct.DISABLED, false, Boolean], 
  ['loading', ButtonDataStruct.LOADING, false, Boolean], 
  ['form-type', ButtonDataStruct.FORM_TYPE, quotate(''), String],
  ['open-type', ButtonDataStruct.FORM_TYPE, quotate(''), String],
  ['hover-class', ButtonDataStruct.HOVER_CLASS, quotate('button-hover'), String],
  ['hover-stop-propagation', ButtonDataStruct.HOVER_STOP_PROPAGATION, false, Boolean],
  ['hover-start-time', ButtonDataStruct.HOVER_START_TIME, 20, Number],
  ['hover-stay-time', ButtonDataStruct.HOVER_START_TIME, 70, Number],
  ['lang', ButtonDataStruct.LANG, quotate(''), String],
  ['session-from', ButtonDataStruct.SESSION_FORM, quotate(''), String],
  ['send-message-title', ButtonDataStruct.SEND_MESSAGE_TITLE, quotate(''), String],
  ['send-message-path', ButtonDataStruct.SEND_MESSAGE_PATH, quotate(''), String],
  ['send-message-img', ButtonDataStruct.SEND_MESSAGE_IMG, quotate(''), String],
  ['app-parameter', ButtonDataStruct.APP_PARAMETER, quotate(''), String],
]

export const buttonDefaultEvents = [
  ['touchstart', ButtonDataStruct.TOUCH_START, false],
  ['touchmove', ButtonDataStruct.TOUCH_MOVE, false],
  ['touchend', ButtonDataStruct.TOUCH_END, false], 
  ['touchcancel', ButtonDataStruct.TOUCH_CANCEL, false], 
  ['touchforcechange', ButtonDataStruct.TOUCH_FORCE_CHANGE, false], 
  ['animationstart', ButtonDataStruct.ANIMATION_START, false],
  ['animationiteration', ButtonDataStruct.ANIMATION_ITERATION, false],
  ['animationend', ButtonDataStruct.ANIMATION_END, false],
  ['transitionstart', ButtonDataStruct.TRANSITION_START, false],
  ['transitioniteration', ButtonDataStruct.TRANSITION_ITERATION, false],
  ['transitionend', ButtonDataStruct.TRANSITION_END, false],
  ['tap', ButtonDataStruct.TAP, false], 
  ['longtap', ButtonDataStruct.LONG_TAP, false],
  ['error', ButtonDataStruct.ERROR, false],
  ['getuserinfo', ButtonDataStruct.GET_USERINFO, false],
  ['getphonenumber', ButtonDataStruct.GET_PHONENUMBER, false],
]