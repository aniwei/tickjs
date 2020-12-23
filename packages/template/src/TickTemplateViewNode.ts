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

export const ViewDataStruct = DataStruct;

export function createView () {
  const view = new TickTemplateViewNode();

  return view;
}

export class TickTemplateViewNode extends TickTemplateOpenningComponent {
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
    super(
      'view', 
      TickTemplateViewNode.defaultProps, 
      TickTemplateViewNode.defaultEvents
    );
  }
}

