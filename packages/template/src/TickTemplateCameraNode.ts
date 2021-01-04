
import {
  cameraDefaultEvents,
  cameraDefaultProps,
} from '@tickjs/struct'
import {
  TickTemplateClosingComponent,
  MiniProgramTemplateID,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createCamera () {
  const camera = new TickTemplateCameraNode();

  return camera;
}

export class TickTemplateCameraNode extends TickTemplateClosingComponent {
  static defaultProps = cameraDefaultProps.map(transformDefaultProps)
  static defaultEvents = cameraDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'camera', 
      TickTemplateCameraNode.defaultProps, 
      TickTemplateCameraNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.CAMERA);
  }
}