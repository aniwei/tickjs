
import {
  textDefaultEvents,
  textDefaultProps,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';
import { 
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createText () {
  const text = new TickTemplateTextNode();

  return text;
}

export class TickTemplateTextNode extends TickTemplateOpenningComponent {
  static defaultProps = textDefaultEvents.map(transformDefaultProps)
  static defaultEvents = textDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'text', 
      TickTemplateTextNode.defaultProps, 
      TickTemplateTextNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.TEXT)
  }
}
