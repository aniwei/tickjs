
import {
  buttonDefaultEvents,
  buttonDefaultProps,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultProps,
  transformDefaultEvent
} from './shared'

export function createButton () {
  const button = new TickTemplateButtonNode();

  return button;
}

export class TickTemplateButtonNode extends TickTemplateOpenningComponent {
  static defaultProps = buttonDefaultProps.map(transformDefaultProps)
  static defaultEvents = buttonDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'button', 
      TickTemplateButtonNode.defaultProps, 
      TickTemplateButtonNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.CAMERA);
  }
}
