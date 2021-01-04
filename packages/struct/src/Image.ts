import { NextDataStruct } from './Base';
import { quotate } from './shared';

export enum ImageDataStruct {
  SRC = NextDataStruct.NEXT,
  MODE,
  WEBP,
  LAZY_LOAD,
  SHOW_MENU_BY_LONGPRESS,  
  ERROR,
  LOAD
}

export const imageDefaultProps = [
  ['src', ImageDataStruct.SRC, quotate(''), String],
  ['mode', ImageDataStruct.MODE, quotate('scaleToFill'), String],
  ['webp', ImageDataStruct.WEBP, false, Boolean], 
  ['lazy-load', ImageDataStruct.LAZY_LOAD, false, Boolean], 
  ['show-menu-by-longpress', ImageDataStruct.SHOW_MENU_BY_LONGPRESS, false, Boolean], 
]

export const imageDefaultEvents = [
  ['error', ImageDataStruct.ERROR, false],
  ['load', ImageDataStruct.LOAD, false],
]