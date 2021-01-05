import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';


export function createPickerViewColumn () {
  const pickerView = new TickTemplatePickeViewrColumnNode();

  return pickerView;
}

export class TickTemplatePickeViewrColumnNode extends TickTemplateOpenningComponent {
  static defaultProps = []
  static defaultEvents = []

  constructor () {
    super(
      'picker-view-column', 
      TickTemplatePickeViewrColumnNode.defaultProps, 
      TickTemplatePickeViewrColumnNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.PICKER_VIEW_COLUMN);
  }
}