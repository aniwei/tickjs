import {
  TickTemplateOpenningComponent,
  DataStruct
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum HTMLDataStruct {
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


export function createHTMLBlock (tagName: string) {
  const blockNode = new TickTemplateHTMLBlockNode(tagName);

  return blockNode;
}

export class TickTemplateHTMLBlockNode extends TickTemplateOpenningComponent {
  static defaultProps: any[] = [
  ];

  static defaultEvents = [
    ['tap', variable(HTMLDataStruct.TAP), true], 
    ['longtap', variable(HTMLDataStruct.LONGTAP), true],
    ['longpress', variable(HTMLDataStruct.LONGPRESS), true],
    ['touchstart', variable(HTMLDataStruct.TOUCHSTART), true],
    ['touchmove', variable(HTMLDataStruct.TOUCHMOVE), true],
    ['touchend', variable(HTMLDataStruct.TOUCHEND), true], 
    ['touchcancel', variable(HTMLDataStruct.TOUCHCANCEL), true], 
    ['touchforcechange', variable(HTMLDataStruct.TOUCHFORCECHANGE), true], 
    ['transitionstart', variable(HTMLDataStruct.TRANSITIONSTART), true],
    ['transitioniteration', variable(HTMLDataStruct.TRANSITIONITERATION), true],
    ['transitionend', variable(HTMLDataStruct.TRANSITIONEND), true],
    ['animationstart', variable(HTMLDataStruct.ANIMATIONSTART), true],
    ['animationiteration', variable(HTMLDataStruct.ANIMATIONITERATION), true],
    ['animationend', variable(HTMLDataStruct.ANIMATIONNEND), true],
  ];

  constructor (tagName: string, templateId?) {
    super(tagName);

    this.setAttribute('template' ,templateId);

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