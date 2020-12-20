import {
  TickTemplateAttributes
} from './TickTemplateAttributes';

import {
TickTemplateEvents
} from './TickTemplateEvents';

export enum TagType {
  CLOSING,
  OPENNING
}

export class Template extends Array {
  space (): Template {
    this.push(' ');
    return this;
  }

  next (string): Template {
    this.push(string);
    return this;
  }

  stringify () {
    return this.join('').trim();
  }
}

export class TickTemplateTag {
  public name: string
  public type: TagType

  constructor (name: string, type: TagType) {
    this.name = name;
    this.type = type
  }

  stringify (properties, childNodes, options?) {
    const template: Template = new Template();

    // <tagName 
    template
      .next('<')
      .next(this.name)
      .space();

    // property-name="property-value" ...
    for (const props of properties) {
      if (props.size() > 0) {
        template
          .next(props.stringify())
          .space();
      }
    }

    if (this.type === TagType.CLOSING) {
      template.next('/>');
    } else {
      template
        .next('>')
        .next(childNodes.stringify())
        .next(`</${this.name}>`);
    }
    
    return template.stringify()
  }
}

export class TickTemplateChildNodes extends Array {
  public get lastChild (): TickTemplate| undefined {
    return this[this.length - 1];
  }

  public get firstChild (): TickTemplate| undefined {
    return this[0];
  }

  public set firstChild (child: TickTemplate| undefined) {
    const index = this.indexOf(child);

    if (index > 0) {
      this.splice(index, 1);
    } 

    this.unshift(child);
  }

  public set lastChild (child: TickTemplate| undefined) {
    const index = this.indexOf(child);

    if (index > 0) {
      this.splice(index, 1);
    } 

    this.push(child);
  }

  stringify () {
    const template: Template = new Template();

    if (this.length > 0) {
      for (const child of this) {
        template.next(child.stringify());
      }
    }

    return template.stringify();
  }
}

export class TickTemplate {
  public tag: TickTemplateTag
  public attributes: TickTemplateAttributes
  public events: TickTemplateEvents
  public childNodes: TickTemplateChildNodes
  public parentNode: TickTemplate | null;

  constructor (tagName, tagType: TagType) {
    this.tag = new TickTemplateTag(tagName, tagType);
    this.attributes = new TickTemplateAttributes();
    this.events = new TickTemplateEvents();
    this.childNodes = new TickTemplateChildNodes();
    this.parentNode = null;
  }

  public get level (): number {
    return this.parentNode ?
      this.parentNode.level + 1 : 0
  }

  public get firstChild (): TickTemplate| undefined {
    return this.childNodes.firstChild;
  }

  public set firstChild (child: TickTemplate | undefined) {
    if (child) {
      child.parentNode = this;
    }

    this.childNodes.firstChild = child;
  }

  public get lastChild (): TickTemplate | undefined {
    return this.childNodes.lastChild;
  }

  public set lastChild (child: TickTemplate| undefined) {
    if (child) {
      child.parentNode = this;
    }

    this.childNodes.lastChild = child;
  }


  indexOf (child: TickTemplate): number {
    const index = this.childNodes.indexOf(child);

    return index;
  }

  appendChild (child: TickTemplate) {
    child.parentNode = this;
    this.childNodes.push(child);
  }

  removeChild (child: TickTemplate) {
    const index: number = this.indexOf(child);

    if (index > -1) {
      this.childNodes.splice(index, 1);
      child.parentNode = null;
    }
  }

  removeEventListener (eventName) {
    this.events.removeEventListener(eventName);
  }

  addEventListener (eventName, listenerName, capture) {
    this.events.addEventListener(eventName, listenerName, capture);
  }

  getAttribute (keyName) {
    this.attributes.getAttribute(keyName);
  }

  setAttribute (keyName, valueName, defaultValue?) {
    this.attributes.setAttribute(keyName, valueName, defaultValue);
  }

  json () {}

  stringify () {
    return this.tag.stringify(
      [this.attributes, this.events],
      this.childNodes
    )
  }
}

