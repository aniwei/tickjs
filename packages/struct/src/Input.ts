import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum InputDataStruct {
  VALUE = NextDataStruct.NEXT,
  TYPE,
  PASSWORD,
  PLACEHOLDER,
  PLACEHOLDER_STYLE,  
  PLACEHOLDER_CLASS,  
  DISABLED,
  MAXLENGTH,
  CURSOR_SPACING,
  AUTO_FOCUS,
  FOCUS,
  CONFIRM_TYPE,
  ALWAYS_EMBED,
  CONFIRM_HOLD,
  CURSOR,
  SELECTION_START,
  SELECTION_END,
  ADJUST_POSITION,
  HOLD_KEYBOARD,

  INPUT,
  FOCUSING,
  BLUR,
  CONFIRM,
  KEYBOARDHEIGHTCHANGE
}

export const inputDefaultProps = [
  ['src', InputDataStruct.VALUE, quotate(''), String],
  ['type', InputDataStruct.TYPE, quotate('text'), String],
  ['password', InputDataStruct.PASSWORD, false, Boolean], 
  ['placeholder', InputDataStruct.PLACEHOLDER, false, String], 
  ['placeholder-style', InputDataStruct.PLACEHOLDER_STYLE, quotate(''), String], 
  ['placeholder-class', InputDataStruct.PLACEHOLDER_CLASS, quotate(''), String], 
  ['disabled', InputDataStruct.DISABLED, false, Boolean], 
  ['maxlength', InputDataStruct.MAXLENGTH, 100, Number], 
  ['cursor-spacing', InputDataStruct.CURSOR_SPACING, 0, Number], 
  ['auto-focus', InputDataStruct.CURSOR_SPACING, false, Boolean], 
  ['confirm-type', InputDataStruct.CONFIRM_TYPE, quotate('text'), String],
  ['always-embed', InputDataStruct.CONFIRM_TYPE, false, Boolean],
  ['confirm-hold', InputDataStruct.CONFIRM_TYPE, false, Boolean],
  ['cursor', InputDataStruct.CURSOR, 0, Number],
  ['selection-start', InputDataStruct.SELECTION_START, 0, Number],
  ['selection-end', InputDataStruct.SELECTION_END, 0, Number],
  ['adjust-position', InputDataStruct.ADJUST_POSITION, false, Boolean],
  ['hold-keyboard', InputDataStruct.HOLD_KEYBOARD, false, Boolean],
  ['disabled', InputDataStruct.DISABLED, false, Boolean], 
]

export const inputDefaultEvents = [
  ['input', InputDataStruct.INPUT, false],
  ['focus', InputDataStruct.FOCUSING, false],
  ['blur', InputDataStruct.BLUR, false],
  ['confirm', InputDataStruct.CONFIRM, false],
  ['keyboardheightchange', InputDataStruct.KEYBOARDHEIGHTCHANGE, false],
]