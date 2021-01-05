import {
  swiperItemDefaultProps,
  swiperItemDefaultEvents,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createSwiperItem () {
  const audio = new TickTemplateSwiperItemNode();

  return audio;
}

export class TickTemplateSwiperItemNode extends TickTemplateOpenningComponent {
  static defaultProps = swiperItemDefaultProps.map(transformDefaultProps)
  static defaultEvents = swiperItemDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'swiper-item', 
      TickTemplateSwiperItemNode.defaultProps, 
      TickTemplateSwiperItemNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.SWIPER_ITEM);
  }
}