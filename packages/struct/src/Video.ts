import { NextDataStruct } from './Base';

export enum VideoDataStruct {
  SRC = NextDataStruct.NEXT,
  DURATION,
  CONTROLS,
  POSTER,
  NAME,
  AUTHOR,

  ERROR,
  PLAY,
  PAUSE,
  TIMEUPDATE,
  ENDED
}

export const audioDefaultProps = [
  ['src', VideoDataStruct.SRC, null],
  ['duration', VideoDataStruct.DURATION, false],
  ['controls', VideoDataStruct.CONTROLS, false], 
  ['poster', VideoDataStruct.POSTER, false], 
  ['name', VideoDataStruct.NAME, false], 
  ['author', VideoDataStruct.AUTHOR, false]
]

export const audioDefaultEvents = [
  ['error', VideoDataStruct.ERROR, false],
  ['play', VideoDataStruct.PLAY, false],
  ['pause', VideoDataStruct.PAUSE, false],
  ['ended', VideoDataStruct.ENDED, false],
  ['timeupdate', VideoDataStruct.TIMEUPDATE, false],
]