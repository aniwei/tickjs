import {
  TickTemplateOpenningComponent,
} from './TickTemplateComponent';

import {
  variable
} from './shared'

enum DataStruct {
  TAP = 6,
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

export const ButtonDataStruct = DataStruct;

export function createButton () {
  const button = new TickTemplateButtonNode();

  return button;
}

export class TickTemplateButtonNode extends TickTemplateOpenningComponent {
  static defaultProps = [];

  static defaultEvents = [
    ['tap', variable(DataStruct.TAP), true], 
    ['longtap', variable(DataStruct.LONGTAP), true],
    ['longpress', variable(DataStruct.LONGPRESS), true],
    ['touchstart', variable(DataStruct.TOUCHSTART), true],
    ['touchmove', variable(DataStruct.TOUCHMOVE), true],
    ['touchend', variable(DataStruct.TOUCHEND), true], 
    ['touchcancel', variable(DataStruct.TOUCHCANCEL), true], 
    ['touchforcechange', variable(DataStruct.TOUCHFORCECHANGE), true], 
    ['transitionstart', variable(DataStruct.TRANSITIONSTART), true],
    ['transitioniteration', variable(DataStruct.TRANSITIONITERATION), true],
    ['transitionend', variable(DataStruct.TRANSITIONEND), true],
    ['animationstart', variable(DataStruct.ANIMATIONSTART), true],
    ['animationiteration', variable(DataStruct.ANIMATIONITERATION), true],
    ['animationend', variable(DataStruct.ANIMATIONNEND), true],
  ];

  constructor () {
    super('button', TickTemplateButtonNode.defaultProps, TickTemplateButtonNode.defaultEvents);
  }
}
