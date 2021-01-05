import { 
  NextDataStruct,
  DefaultProps,
  DefaultEvents
} from './Base';
import { quotate } from './shared';

export enum SwiperDataStruct {
  INDICATOR_DOTS = NextDataStruct.NEXT,
  INDICATOR_COLOR,
  INDICATOR_ACTIVE_COLOR,
  AUTOPLAY,
  CURRENT,
  INTERVAL,
  DURATION,
  CIRCULAR,
  VERTICAL,
  PREVIOUS_MARGIN,
  NEXT_MARGIN,
  SNAP_TO_EDGE,
  DISPLAY_MULTIPLE_ITEMS,
  EASING_FUNCTION,

  CHANGE,
  TRANSITION,
  ANIMATION_FINISH
}

export const swiperDefaultProps: DefaultProps[] = [
  ['indicator-dots', SwiperDataStruct.INDICATOR_DOTS, false, Boolean],
  ['indicator-color', SwiperDataStruct.INDICATOR_COLOR, quotate('rgba(0, 0, 0, .3)'), String],
  ['indicator-active-color', SwiperDataStruct.INDICATOR_ACTIVE_COLOR, false, String], 
  ['autoplay', SwiperDataStruct.AUTOPLAY, false, Boolean],
  ['current', SwiperDataStruct.CURRENT, 0, Number], 
  ['interval', SwiperDataStruct.INTERVAL, 10, Number], 
  ['duration', SwiperDataStruct.DURATION, 50, Number],
  ['circular', SwiperDataStruct.INTERVAL, false, Boolean], 
  ['vertical', SwiperDataStruct.VERTICAL, false, Boolean], 
  ['previous-margin', SwiperDataStruct.PREVIOUS_MARGIN, 10, Number], 
  ['next-margin', SwiperDataStruct.PREVIOUS_MARGIN, 10, Number], 
  ['snap-to-edge', SwiperDataStruct.SNAP_TO_EDGE, false, Boolean], 
  ['display-multiple-items', SwiperDataStruct.DISPLAY_MULTIPLE_ITEMS, 1, Number], 
  ['easing-function', SwiperDataStruct.EASING_FUNCTION, quotate('default'), String],
]

export const swiperDefaultEvents: DefaultEvents[] = [
  ['change', SwiperDataStruct.CHANGE, false],
  ['transition', SwiperDataStruct.TRANSITION, false],
  ['animationfinish', SwiperDataStruct.ANIMATION_FINISH, false]
]