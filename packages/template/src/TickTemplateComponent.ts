import {
  TagType,
  TickTemplate
} from './TickTemplate';

import {
  variable
} from './shared'

export enum DataStruct {
  TEMPLATE,
  ID,
  CLASS,
  STYLE,
  CHILDREN
}

export enum SupportMiniProgramComponent {
  AUDIO = 'audio',
  BUTTON = 'button',
  CANVAS = 'canvas',
  CAMERA = 'camera',
  CIRCLATE = 'circlate',
  TEXT = 'text',
  VIEW = 'view',
}

export enum SupportHTMLComponent {
  HEAD = 'head',
  BODY = 'body',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  DIV = 'div',
  P = 'p',
  UL = 'ul',
  OL = 'ol',
  LI = 'li',
  SPAN = 'span',
  I = 'i'
}

export enum MiniProgramTemplateID {
  CIRCLATE,
  VIEW,
  TEXT,
  BUTTON,
  CANVAS,
  CAMERA,
  AUDIO,
}

export class TickTemplateComponent extends TickTemplate {
  constructor (tagName: string, type: TagType, defaultProps?: any[], defaultEvents?: any[]) {
    super(tagName, type);

    this.setAttribute('id', variable(DataStruct.ID));
    this.setAttribute('class', variable(DataStruct.CLASS));
    this.setAttribute('style',variable(DataStruct.STYLE))

    if (defaultProps) {
      for (
        const [
          keyName, 
          valueName, 
          defaultValue
        ] of defaultProps
      ) {
        this.setAttribute(keyName, valueName, defaultValue);
      }
    }

    if (defaultEvents) {
      for (
        const [
          eventName, 
          listenerName, 
          capture
        ] of defaultEvents
      ) {
        this.addEventListener(eventName, listenerName, capture);
      }
    }
  }

}

export class TickTemplateClosingComponent extends TickTemplateComponent {
  constructor (tagName: string, defaultProps?: any[], defaultEvents?: any[]) {
    super(tagName, TagType.CLOSING, defaultProps, defaultEvents);
  }
}

export class TickTemplateOpenningComponent extends TickTemplateComponent {
  constructor (tagName: string, defaultProps?: any[], defaultEvents?: any[]) {
    super(tagName, TagType.OPENNING, defaultProps, defaultEvents);
  }
}