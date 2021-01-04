import { NextDataStruct } from './Base';

export enum TextDataStruct {
  SELECTABLE = NextDataStruct.NEXT,
  USER_SELECT,
  SPACE,
  DECODE,
  
  TAP,
  LONG_TAP,
  LONG_PRESS,
  
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
  TOUCH_FORCE_CHANGE,
}

export const textDefaultProps = [
  ['selectable', TextDataStruct.SELECTABLE, false, Boolean],
  ['user-select', TextDataStruct.USER_SELECT, false, Boolean],
  ['space', TextDataStruct.SPACE, false, Boolean], 
  ['decode', TextDataStruct.DECODE, false, Boolean]
]

export const textDefaultEvents = [
  ['touchstart', TextDataStruct.TOUCH_START, false],
  ['touchmove', TextDataStruct.TOUCH_MOVE, false],
  ['touchend', TextDataStruct.TOUCH_END, false], 
  ['touchcancel', TextDataStruct.TOUCH_CANCEL, false], 
  ['touchforcechange', TextDataStruct.TOUCH_FORCE_CHANGE, false], 
  ['tap', TextDataStruct.TAP, false], 
  ['longtap', TextDataStruct.LONG_TAP, false],
]