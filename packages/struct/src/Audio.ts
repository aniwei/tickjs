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
  ['src', AudioDataStruct.SRC, null],
  ['loop', AudioDataStruct.LOOP, false],
  ['controls', AudioDataStruct.CONTROLS, false], 
  ['poster', AudioDataStruct.POSTER, false], 
  ['name', AudioDataStruct.NAME, false], 
  ['author', AudioDataStruct.AUTHOR, false]
]

export const audioDefaultEvents: DefaultEvents[] = [
  ['error', AudioDataStruct.ERROR, false],
  ['play', AudioDataStruct.PLAY, false],
  ['pause', AudioDataStruct.PAUSE, false],
  ['ended', AudioDataStruct.ENDED, false],
  ['timeupdate', AudioDataStruct.TIMEUPDATE, false],
]