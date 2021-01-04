import { NextDataStruct } from './Base';

export enum CanvasDataStruct {
  TYPE = NextDataStruct.NEXT,
  CANVAS_ID,

  LONG_TAP,
  
  TOUCH_START,
  TOUCH_MOVE,
  TOUCH_END,
  TOUCH_CANCEL,
  TOUCH_FORCE_CHANGE,

  ERROR,
}

export const canvasDefaultProps = [
  ['type', CanvasDataStruct.TYPE, null],
  ['canvas-id', CanvasDataStruct.CANVAS_ID, false]
]

export const canvasDefaultEvents = [
  ['error', CanvasDataStruct.ERROR, false],
  ['longtap', CanvasDataStruct.LONG_TAP, false],
  ['touchstart', CanvasDataStruct.TOUCH_START, false],
  ['touchmove', CanvasDataStruct.TOUCH_MOVE, false],
  ['touchend', CanvasDataStruct.TOUCH_END, false], 
  ['touchcancel', CanvasDataStruct.TOUCH_CANCEL, false], 
  ['touchforcechange', CanvasDataStruct.TOUCH_FORCE_CHANGE, false], 
]