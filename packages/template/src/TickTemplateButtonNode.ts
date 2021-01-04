import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
  DataStruct
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum ButtonDataStruct {
  TAP = 5,
  LONGTAP,
  LONGPRESS,
  TOUCHSTART,
  TOUCHMOVE,
  TOUCHEND,
  TOUCHCANCEL,
  TOUCHFORCECHANGE,
  TRANSITIONSTART,
  TRANSITIONITERATION,
  TRANSITIONEND,
  ANIMATIONSTART,
  ANIMATIONITERATION,
  ANIMATIONNEND
}

export function createButton () {
  const button = new TickTemplateButtonNode();

  return button;
}

export class TickTemplateButtonNode extends TickTemplateOpenningComponent {
  static defaultProps = [];

  static defaultEvents = [
    ['tap', variable(ButtonDataStruct.TAP), true], 
    ['longtap', variable(ButtonDataStruct.LONGTAP), true],
    ['longpress', variable(ButtonDataStruct.LONGPRESS), true],
    ['touchstart', variable(ButtonDataStruct.TOUCHSTART), true],
    ['touchmove', variable(ButtonDataStruct.TOUCHMOVE), true],
    ['touchend', variable(ButtonDataStruct.TOUCHEND), true], 
    ['touchcancel', variable(ButtonDataStruct.TOUCHCANCEL), true], 
    ['touchforcechange', variable(ButtonDataStruct.TOUCHFORCECHANGE), true], 
    ['transitionstart', variable(ButtonDataStruct.TRANSITIONSTART), true],
    ['transitioniteration', variable(ButtonDataStruct.TRANSITIONITERATION), true],
    ['transitionend', variable(ButtonDataStruct.TRANSITIONEND), true],
    ['animationstart', variable(ButtonDataStruct.ANIMATIONSTART), true],
    ['animationiteration', variable(ButtonDataStruct.ANIMATIONITERATION), true],
    ['animationend', variable(ButtonDataStruct.ANIMATIONNEND), true],
  ];

  constructor () {
    super(
      'button', 
      TickTemplateButtonNode.defaultProps, 
      TickTemplateButtonNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.CAMERA);
  }
}
