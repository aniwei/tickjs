import {
  pickerViewDefaultProps,
  pickerViewDefaultEvents,
  MiniProgramTemplateID,
} from '@tickjs/struct'
import {
  TickTemplateOpenningComponent,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createPickerView () {
  const ppickerView = new TickTemplatePickerViewNode();

  return ppickerView;
}

export class TickTemplatePickerViewNode extends TickTemplateOpenningComponent {
  static defaultProps = pickerViewDefaultProps.map(transformDefaultProps)
  static defaultEvents = pickerViewDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'picker-view', 
      TickTemplatePickerViewNode.defaultProps, 
      TickTemplatePickerViewNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.PICKER_VIEW);
  }
}