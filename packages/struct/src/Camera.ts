import { NextDataStruct } from './Base';

export enum CameraDataStruct {
  MODE = NextDataStruct.NEXT,
  RESOLUTION,
  DEVICE_POSITION,
  FLASH,
  FRAME_SIZE,

  ERROR,
  STOP,
  INIT_DONE,
  SCAN_CODE,
}

export const cameraDefaultProps = [
  ['mode', CameraDataStruct.MODE, null],
  ['resolution', CameraDataStruct.RESOLUTION, false],
  ['device-position', CameraDataStruct.DEVICE_POSITION, false], 
  ['flash', CameraDataStruct.FLASH, false], 
  ['frame-size', CameraDataStruct.FRAME_SIZE, false], 
]

export const cameraDefaultEvents = [
  ['error', CameraDataStruct.ERROR, false],
  ['stop', CameraDataStruct.STOP, false],
  ['initdone', CameraDataStruct.INIT_DONE, false],
  ['scancode', CameraDataStruct.SCAN_CODE, false],
]