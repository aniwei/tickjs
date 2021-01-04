import {
  TickTemplateClosingComponent,
  MiniProgramTemplateID,
  DataStruct
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum CameraDataStruct {
  MODE = 5,
  RESOLUTION,
  DEVICE_POSITION,
  FLASH,
  FRAME_SIZE,
  STOP,
  ERROR,
  INITDONE,
  SCANCODE
}


export function createCamera () {
  const camera = new TickTemplateCameraNode();

  return camera;
}

export class TickTemplateCameraNode extends TickTemplateClosingComponent {
  static defaultProps = [
    ['mode', variable(CameraDataStruct.MODE), null],
    ['resolution', variable(CameraDataStruct.RESOLUTION), false],
    ['device-position', variable(CameraDataStruct.DEVICE_POSITION), false], 
    ['frame-size', variable(CameraDataStruct.FRAME_SIZE), false]
  ];

  static defaultEvents = [
    ['stop', variable(CameraDataStruct.STOP), false], 
    ['initdone', variable(CameraDataStruct.INITDONE), false],
    ['scancode', variable(CameraDataStruct.SCANCODE), false], 
  ];

  constructor () {
    super(
      'camera', 
      TickTemplateCameraNode.defaultProps, 
      TickTemplateCameraNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.CAMERA);
  }
}