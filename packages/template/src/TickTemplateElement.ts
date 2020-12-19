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

export class TickTemplateTag {
  public name: string
  public type: TagType

  constructor (name, type) {
    this.name = name;
    this.type = type
  }

  stringify (properties, ) {
  
  }
}

export class TickTemplateChildNodes extends Array {
  public get lastChild (): TickTemplateElement | undefined {
    return this[this.length - 1];
  }

  public get firstChild (): TickTemplateElement | undefined {
    return this[this.length - 1];
  }

  public set firstChild (child: TickTemplateElement): void {
    const index = this.indexOf(child);

    if (index > 0) {
      this.splice(index, 1);
    } 

    this.unshift(child);
  }

  stringify () {

  }
}

export class TickTemplateElement {
  public tag: TickTemplateTag
  public attributes: TickTemplateAttributes
  public events: TickTemplateEvents
  public childNodes: TickTemplateChildNodes

  constructor (tagName, tagType: TagType) {
    this.tag = new TickTemplateTag(tagName, tagType);
    this.attributes = new TickTemplateAttributes();
    this.events = new TickTemplateEvents();
    this.childNodes = new TickTemplateChildNodes();
  }

  public get firstChild (): TickTemplateElement | void {
    return this.childNodes.firstChild;
  }

  public set firstChild (child: TickTemplateElement): void {
    this.childNodes.firstChild = child;
  }

  public get lastChild (): TickTemplateElement | void {
    return this.childNodes.lastChild;
  }


  indexOf (child: TickTemplateElement): number {
    const index = this.childNodes.indexOf(child);

    return index;
  }

  appendChild (child: TickTemplateElement) {
    this.childNodes.push(TickTemplateElement);
  }

  removeChild (child: TickTemplateElement) {
    const index: number = this.indexOf(child);

    if (index > -1) {
      this.childNodes.splice(index, 1);
    }
  }

  insertBefore (child: TickTemplateElement) {
    // this.childNodes.push(TickTemplateElement);
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

  stringify () {
    return this.tag.stringify(
      [this.attributes, this.events], 
    )
  }
}

