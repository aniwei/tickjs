import { 
  NextDataStruct,
  DefaultProps,
  DefaultEvents
} from './Base';
import { quotate } from './shared';

export enum SwiperItemDataStruct {
  ITEM_ID = NextDataStruct.NEXT,
  SKIP_HIDDEN_ITEM_LAYOUT,
}

export const swiperItemDefaultProps: DefaultProps[] = [
  ['indicator-dots', SwiperItemDataStruct.ITEM_ID, quotate(''), String],
  ['skip-hidden-item-layout', SwiperItemDataStruct.SKIP_HIDDEN_ITEM_LAYOUT, false, Boolean],
]

export const swiperItemDefaultEvents: DefaultEvents[] = []