import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum ViewDataStruct {
  HOVER_CLASS = NextDataStruct.NEXT,
  HOVER_STOP_PROPAGATION,
  HOVER_START_TIME,
  HOVER_STAY_TIME,

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
  ['hover-class', ViewDataStruct.HOVER_CLASS, quotate('button-hover'), String],
  ['hover-stop-propagation', ViewDataStruct.HOVER_STOP_PROPAGATION, false, Boolean],
  ['hover-start-time', ViewDataStruct.HOVER_START_TIME, 20, Number],
  ['hover-stay-time', ViewDataStruct.HOVER_START_TIME, 70, Number]
]

export const buttonDefaultEvents = [
  ['touchstart', ViewDataStruct.TOUCH_START, false],
  ['touchmove', ViewDataStruct.TOUCH_MOVE, false],
  ['touchend', ViewDataStruct.TOUCH_END, false], 
  ['touchcancel', ViewDataStruct.TOUCH_CANCEL, false], 
  ['touchforcechange', ViewDataStruct.TOUCH_FORCE_CHANGE, false], 
  ['animationstart', ViewDataStruct.ANIMATION_START, false],
  ['animationiteration', ViewDataStruct.ANIMATION_ITERATION, false],
  ['animationend', ViewDataStruct.ANIMATION_END, false],
  ['transitionstart', ViewDataStruct.TRANSITION_START, false],
  ['transitioniteration', ViewDataStruct.TRANSITION_ITERATION, false],
  ['transitionend', ViewDataStruct.TRANSITION_END, false],
  ['tap', ViewDataStruct.TAP, false], 
  ['longtap', ViewDataStruct.LONG_TAP, false],
]