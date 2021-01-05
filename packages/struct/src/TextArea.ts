import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum TextAreaDataStruct {
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

export const textareaDefaultProps = [
  ['src', TextAreaDataStruct.VALUE, quotate(''), String],
  ['type', TextAreaDataStruct.TYPE, quotate('text'), String],
  ['password', TextAreaDataStruct.PASSWORD, false, Boolean], 
  ['placeholder', TextAreaDataStruct.PLACEHOLDER, false, String], 
  ['placeholder-style', TextAreaDataStruct.PLACEHOLDER_STYLE, quotate(''), String], 
  ['placeholder-class', TextAreaDataStruct.PLACEHOLDER_CLASS, quotate(''), String], 
  ['disabled', TextAreaDataStruct.DISABLED, false, Boolean], 
  ['maxlength', TextAreaDataStruct.MAXLENGTH, 100, Number], 
  ['cursor-spacing', TextAreaDataStruct.CURSOR_SPACING, 0, Number], 
  ['auto-focus', TextAreaDataStruct.CURSOR_SPACING, false, Boolean], 
  ['confirm-type', TextAreaDataStruct.CONFIRM_TYPE, quotate('text'), String],
  ['always-embed', TextAreaDataStruct.CONFIRM_TYPE, false, Boolean],
  ['confirm-hold', TextAreaDataStruct.CONFIRM_TYPE, false, Boolean],
  ['cursor', TextAreaDataStruct.CURSOR, 0, Number],
  ['selection-start', TextAreaDataStruct.SELECTION_START, 0, Number],
  ['selection-end', TextAreaDataStruct.SELECTION_END, 0, Number],
  ['adjust-position', TextAreaDataStruct.ADJUST_POSITION, false, Boolean],
  ['hold-keyboard', TextAreaDataStruct.HOLD_KEYBOARD, false, Boolean],
  ['disabled', TextAreaDataStruct.DISABLED, false, Boolean], 
]

export const textareaDefaultEvents = [
  ['input', TextAreaDataStruct.INPUT, false],
  ['focus', TextAreaDataStruct.FOCUSING, false],
  ['blur', TextAreaDataStruct.BLUR, false],
  ['confirm', TextAreaDataStruct.CONFIRM, false],
  ['keyboardheightchange', TextAreaDataStruct.KEYBOARDHEIGHTCHANGE, false],
]