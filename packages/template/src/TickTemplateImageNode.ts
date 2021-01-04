
import {
  imageDefaultEvents,
  imageDefaultProps,
} from '@tickjs/struct'
import {
  TickTemplateClosingComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultProps,
  transformDefaultEvent
} from './shared'

export function createImage () {
  const image = new TickTemplateImageNode();

  return image;
}

export class TickTemplateImageNode extends TickTemplateClosingComponent {
  static defaultProps = imageDefaultProps.map(transformDefaultProps)
  static defaultEvents = imageDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'image', 
      TickTemplateImageNode.defaultProps, 
      TickTemplateImageNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.IMAGE);
  }
}
