import {
  inputDefaultProps,
  inputDefaultEvents,
} from '@tickjs/struct'
import {
  TickTemplateClosingComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createInput () {
  const input = new TickTemplateInputNode();

  return input;
}

export class TickTemplateInputNode extends TickTemplateClosingComponent {
  static defaultProps = inputDefaultProps.map(transformDefaultProps)
  static defaultEvents = inputDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'input', 
      TickTemplateInputNode.defaultProps, 
      TickTemplateInputNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.INPUT);
  }
}