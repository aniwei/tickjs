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

export const HTMLDataStruct = DataStruct

export function createHTMLBlock (tagName: string) {
  const blockNode = new TickTemplateHTMLBlockNode(tagName);

  return blockNode;
}

export class TickTemplateHTMLBlockNode extends TickTemplateOpenningComponent {
  static defaultProps: any[] = [
  ];

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

  constructor (tagName: string) {
    super(tagName);

    if (TickTemplateHTMLBlockNode.defaultProps.length > 0) {
      for (
        const [
          keyName, 
          valueName, 
          defaultValue
        ] of TickTemplateHTMLBlockNode.defaultProps
      ) {
        this.setAttribute(keyName, valueName, defaultValue);
      }
    }

    if (TickTemplateHTMLBlockNode.defaultEvents.length > 0) {
      for (
        const [
          eventName, 
          listenerName, 
          capture
        ] of TickTemplateHTMLBlockNode.defaultEvents
      ) {
        this.addEventListener(eventName, listenerName, capture);
      }
    }
  }
}