
import {
  scrollViewDefaultProps,
  scrollViewDefaultEvents,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultProps,
  transformDefaultEvent
} from './shared'

export function createScrollView () {
  const scrollView = new TickTemplateScrollViewNode();

  return scrollView;
}

export class TickTemplateScrollViewNode extends TickTemplateOpenningComponent {
  static defaultProps = scrollViewDefaultProps.map(transformDefaultProps)
  static defaultEvents = scrollViewDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'button', 
      TickTemplateScrollViewNode.defaultProps, 
      TickTemplateScrollViewNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.SCROLL_VIEW);
  }
}
