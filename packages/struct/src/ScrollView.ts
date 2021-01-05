import { 
  NextDataStruct,
  DefaultProps,
  DefaultEvents
} from './Base';

export enum ScrollViewDataStruct {
  SCROLL_X = NextDataStruct.NEXT,
  SCROLL_Y,
  UPPER_THRESHOLD,
  LOWER_THRESHOLD,
  SCROLL_TOP,
  SCROLL_LEFT,
  SCROLL_INTO_VIEW,
  SCROLL_WITH_ANIMATION,
  ENABLE_BACK_TOP_TOP,
  ENABLE_FLEX,
  SCROLL_ANCHORING,
  
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

export const scrollViewDefaultProps: DefaultProps[] = [
  ['scroll-x', ScrollViewDataStruct.SCROLL_X, null, Boolean],
  ['scroll-y', ScrollViewDataStruct.SCROLL_Y, false, Boolean],
  ['upper-threshold', ScrollViewDataStruct.UPPER_THRESHOLD, false, Number], 
  ['lower-threshold', ScrollViewDataStruct.LOWER_THRESHOLD, false, Number],
  ['scroll-top', ScrollViewDataStruct.SCROLL_TOP, false, Number], 
  ['scroll-left', ScrollViewDataStruct.SCROLL_LEFT, false, Number], 
]

export const scrollViewDefaultEvents: DefaultEvents[] = [
  ['error', ScrollViewDataStruct.ERROR, false],
  ['play', ScrollViewDataStruct.PLAY, false],
  ['pause', ScrollViewDataStruct.PAUSE, false],
  ['ended', ScrollViewDataStruct.ENDED, false],
  ['timeupdate', ScrollViewDataStruct.TIMEUPDATE, false],
]