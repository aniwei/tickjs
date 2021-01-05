import {
  textareaDefaultProps,
  textareaDefaultEvents,
} from '@tickjs/struct'
import {
  TickTemplateClosingComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createTextArea () {
  const textarea = new TickTemplateTextAreaNode();

  return textarea;
}

export class TickTemplateTextAreaNode extends TickTemplateClosingComponent {
  static defaultProps = textareaDefaultProps.map(transformDefaultProps)
  static defaultEvents = textareaDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'textarea', 
      TickTemplateTextAreaNode.defaultProps, 
      TickTemplateTextAreaNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.INPUT);
  }
}