import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum PickerViewDataStruct {
  VALUE = NextDataStruct.NEXT,
  INDICATOR_STYLE,
  INDICATOR_CLASS,
  MASK_STYLE,
  MASK_CLASS,

  CHANGE,
  PICK_START,
  PICK_END
}

export const pickerViewDefaultProps = [
  ['value', PickerViewDataStruct.VALUE, quotate(''), String],
  ['indicator-style', PickerViewDataStruct.INDICATOR_STYLE, quotate(''), String],
  ['indicator-class', PickerViewDataStruct.INDICATOR_CLASS, quotate(''), String],
  ['mask-style', PickerViewDataStruct.MASK_STYLE, quotate(''), String],
  ['mask-class', PickerViewDataStruct.MASK_CLASS, quotate(''), String]
]

export const pickerViewDefaultEvents = [
  ['change', PickerViewDataStruct.CHANGE, false],
  ['pickstart', PickerViewDataStruct.PICK_START, false],
  ['pickend', PickerViewDataStruct.PICK_END, false],
]