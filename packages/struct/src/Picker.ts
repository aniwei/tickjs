import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum PickerDataStruct {
  HEADER_TEXT = NextDataStruct.NEXT,
  MODE,
  DISABLED,

  CANCEL
}

export const pickerDefaultProps = [
  ['header-text', PickerDataStruct.HEADER_TEXT, quotate(''), String],
  ['mode', PickerDataStruct.MODE, quotate('selector'), String],
  ['disabled', PickerDataStruct.DISABLED, false, Boolean], 
]

export const pickerDefaultEvents = [
  ['cancel', PickerDataStruct.CANCEL, false],
]