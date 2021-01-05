import { 
  NextDataStruct,
  DefaultProps,
  DefaultEvents
} from './Base';

export enum AudioDataStruct {
  SRC = NextDataStruct.NEXT,
  LOOP,
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

export const audioDefaultProps: DefaultProps[] = [
  ['src', AudioDataStruct.SRC, null, String],
  ['loop', AudioDataStruct.LOOP, false, Boolean],
  ['controls', AudioDataStruct.CONTROLS, false, Boolean], 
  ['poster', AudioDataStruct.POSTER, false, String], 
  ['name', AudioDataStruct.NAME, false, String], 
  ['author', AudioDataStruct.AUTHOR, false, String]
]

export const audioDefaultEvents: DefaultEvents[] = [
  ['error', AudioDataStruct.ERROR, false],
  ['play', AudioDataStruct.PLAY, false],
  ['pause', AudioDataStruct.PAUSE, false],
  ['ended', AudioDataStruct.ENDED, false],
  ['timeupdate', AudioDataStruct.TIMEUPDATE, false],
]