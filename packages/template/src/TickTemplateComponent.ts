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
  constructor (tagName: string, type: TagType) {
    super(tagName, type);

    this.setAttribute('id', variable(DataStruct.ID));
    this.setAttribute('class', variable(DataStruct.CLASS));
    this.setAttribute('style',variable(DataStruct.STYLE))
  }
}

export class TickTemplateClosingComponent extends TickTemplate {
  constructor (tagName: string) {
    super(tagName, TagType.CLOSING);
  }
}

export class TickTemplateOpenningComponent extends TickTemplate {
  constructor (tagName: string) {
    super(tagName, TagType.OPENNING);
  }
}