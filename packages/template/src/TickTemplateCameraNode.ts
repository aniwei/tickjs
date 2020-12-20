import {
  TickTemplateClosingComponent,
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum DataStruct {
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
  const audio = new TickTemplateCameraNode();

  return audio;
}

export class TickTemplateCameraNode extends TickTemplateClosingComponent {
  static defaultProps = [
    ['mode', variable(DataStruct.MODE), null],
    ['resolution', variable(DataStruct.RESOLUTION), false],
    ['device-position', variable(DataStruct.DEVICE_POSITION), false], 
    ['frame-size', variable(DataStruct.FRAME_SIZE), false]
  ];

  static defaultEvents = [
    ['stop', variable(DataStruct.STOP), false], 
    ['initdone', variable(DataStruct.INITDONE), false],
    ['scancode', variable(DataStruct.SCANCODE), false], 
  ];

  constructor () {
    super('camera');

    for (
      const [
        keyName, 
        valueName, 
        defaultValue
      ] of TickTemplateCameraNode.defaultProps
    ) {
      this.setAttribute(keyName, valueName, defaultValue);
    }

    for (
      const [
        eventName, 
        listenerName, 
        capture
      ] of TickTemplateCameraNode.defaultEvents
    ) {
      this.addEventListener(eventName, listenerName, capture);
    }
  }
}