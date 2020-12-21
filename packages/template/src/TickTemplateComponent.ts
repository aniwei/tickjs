import {
  TagType,
  TickTemplate
} from './TickTemplate';

import {
  variable
} from './shared'

export enum DataStruct {
  TAGNAME,
  ID,
  CLASS,
  STYLE,
  CHILDREN
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