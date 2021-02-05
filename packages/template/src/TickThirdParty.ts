import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
  DataStruct
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum ViewDataStruct {
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

export function createThirdParty () {
  const view = new TickTemplateViewNode();

  return view;
}

export class TickTemplateViewNode extends TickTemplateOpenningComponent {
  static defaultProps = [];

  static defaultEvents = [
    ['tap', variable(ViewDataStruct.TAP), true], 
    ['longtap', variable(ViewDataStruct.LONGTAP), true],
    ['longpress', variable(ViewDataStruct.LONGPRESS), true],
    ['touchstart', variable(ViewDataStruct.TOUCHSTART), true],
    ['touchmove', variable(ViewDataStruct.TOUCHMOVE), true],
    ['touchend', variable(ViewDataStruct.TOUCHEND), true], 
    ['touchcancel', variable(ViewDataStruct.TOUCHCANCEL), true], 
    ['touchforcechange', variable(ViewDataStruct.TOUCHFORCECHANGE), true], 
    ['transitionstart', variable(ViewDataStruct.TRANSITIONSTART), true],
    ['transitioniteration', variable(ViewDataStruct.TRANSITIONITERATION), true],
    ['transitionend', variable(ViewDataStruct.TRANSITIONEND), true],
    ['animationstart', variable(ViewDataStruct.ANIMATIONSTART), true],
    ['animationiteration', variable(ViewDataStruct.ANIMATIONITERATION), true],
    ['animationend', variable(ViewDataStruct.ANIMATIONNEND), true],
  ];

  constructor () {
    super(
      'view', 
      TickTemplateViewNode.defaultProps, 
      TickTemplateViewNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.VIEW)
  }
}

