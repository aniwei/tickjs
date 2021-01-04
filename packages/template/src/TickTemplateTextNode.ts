import { variable } from './shared'
import {
  TickTemplateOpenningComponent,
  MiniProgramTemplateID,
  DataStruct
} from './TickTemplateComponent';


export enum TextDataStruct {
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

export function createText () {
  const text = new TickTemplateTextNode();

  return text;
}

export class TickTemplateTextNode extends TickTemplateOpenningComponent {
  static defaultProps = [
    ['tap', variable(TextDataStruct.TAP), true], 
    ['longtap', variable(TextDataStruct.LONGTAP), true],
    ['longpress', variable(TextDataStruct.LONGPRESS), true],
    ['touchstart', variable(TextDataStruct.TOUCHSTART), true],
    ['touchmove', variable(TextDataStruct.TOUCHMOVE), true],
    ['touchend', variable(TextDataStruct.TOUCHEND), true], 
    ['touchcancel', variable(TextDataStruct.TOUCHCANCEL), true], 
    ['touchforcechange', variable(TextDataStruct.TOUCHFORCECHANGE), true], 
    ['transitionstart', variable(TextDataStruct.TRANSITIONSTART), true],
    ['transitioniteration', variable(TextDataStruct.TRANSITIONITERATION), true],
    ['transitionend', variable(TextDataStruct.TRANSITIONEND), true],
    ['animationstart', variable(TextDataStruct.ANIMATIONSTART), true],
    ['animationiteration', variable(TextDataStruct.ANIMATIONITERATION), true],
    ['animationend', variable(TextDataStruct.ANIMATIONNEND), true],
  ];

  static defaultEvents = [
  ];

  constructor () {
    super(
      'text', 
      TickTemplateTextNode.defaultProps, 
      TickTemplateTextNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.TEXT)
  }
}
