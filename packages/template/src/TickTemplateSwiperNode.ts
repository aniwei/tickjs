import {
  swiperDefaultProps,
  swiperDefaultEvents,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createSwiper () {
  const audio = new TickTemplateSwiperNode();

  return audio;
}

export class TickTemplateSwiperNode extends TickTemplateOpenningComponent {
  static defaultProps = swiperDefaultProps.map(transformDefaultProps)
  static defaultEvents = swiperDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'swiper', 
      TickTemplateSwiperNode.defaultProps, 
      TickTemplateSwiperNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.SWIPER);
  }
}