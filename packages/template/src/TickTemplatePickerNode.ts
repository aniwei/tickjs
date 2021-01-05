import {
  pickerDefaultProps,
  pickerDefaultEvents,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createPicker () {
  const picker = new TickTemplatePickerNode();

  return picker;
}

export class TickTemplatePickerNode extends TickTemplateOpenningComponent {
  static defaultProps = pickerDefaultProps.map(transformDefaultProps)
  static defaultEvents = pickerDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'picker', 
      TickTemplatePickerNode.defaultProps, 
      TickTemplatePickerNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.PICKER);
  }
}