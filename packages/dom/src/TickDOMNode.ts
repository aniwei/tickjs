import { 
  MiniProgramTemplateID
} from '@tickjs/struct'
import {
  NodeType,
} from './shared';

import {
  TickDOMNodeUpdator
} from './TickDOMNodeUpdator'

import {
  TickDOMStyle
} from './TickDOMStyle';

import {
  TickDOMClassName
} from './TickDOMClassName';

enum SpecialAttributeNode {
  STYLE = 'style',
  CLASSNAME = 'className'
}

class TickDOMNodeAttributes extends Map {

}

class TickDOMNodeEvents extends Map {

}

export class TickDOMNode {
  public nodeType: NodeType
  public nodeName: string
  public parentNode: TickDOMNode | null = null
  public childNodes: TickDOMNode[] = []
  public updator: any;

  
  private attributes: TickDOMNodeAttributes = new TickDOMNodeAttributes();
  private events: TickDOMNodeEvents = new TickDOMNodeEvents()

  protected _style: TickDOMStyle | null = null
  protected _templateId: MiniProgramTemplateID | null = null

  public constructor (nodeType: NodeType, nodeName: string) {
    this.nodeType = nodeType
    this.nodeName = nodeName
    this.updator = TickDOMNodeUpdator;
  }

  public get templateId (): MiniProgramTemplateID | null {
    return this._templateId;
  }

  public get style (): TickDOMStyle | null {
    return this._style || (this._style = new TickDOMStyle());
  }

  public get className (): TickDOMClassName | null {
    return null;
  }

  public get parentElement (): TickDOMNode | null {
    const parentNode = this.parentNode;

    if (parentNode !== null) {
      if (parentNode.nodeType === NodeType.ELEMENT_NODE) {
        return parentNode as TickDOMNode;
      }
    }

    return null;
  }

  public get nextSibling () {
    const parentNode = this.parentNode;

    if (parentNode) {
      const childNodes = parentNode.childNodes;
      const index = this.findIndex(childNodes, this) + 1;

      return childNodes[index] || null;
    }

    return null;
  }

  public get previousSibling () {
    const parentNode = this.parentNode;

    if (parentNode) {
      const childNodes = parentNode.childNodes;
      const index = this.findIndex(childNodes, this) - 1;

      return childNodes[index] || null;
    }

    return null;
  }

  public get firstChild () {
    return this.childNodes[0] || null
  }

  public get lastChild () {
    const childNodes = this.childNodes
    return childNodes[childNodes.length - 1] || null
  }

  public set innerHTML (html: string) {
    
  }

  public get innerHTML () {
    return ''
  }

  public get id () {
    return this.getAttribute('id')!
  }

  public set id (val: string) {
    this.setAttribute('id', val)
  }

  public addEventListener () {}

  public removeEventListener () {}

  public setAttribute (key: string, value: any): void {
    if (SpecialAttributeNode.STYLE === key) {
      this.style
    }

    
  }

  public removeAttribute (qualifiedName: string) {
    
  }

  public getAttribute (keyName: string): string {
    if (keyName === 'style') {
      return this.style ? this.style.cssText : ''
    }

    return this.attributes.get(keyName);
  }

  public removeChild<T extends TickDOMNode> (child: T, isReplace?: boolean): T {
    const index = this.findIndex(this.childNodes, child)
    this.childNodes.splice(index, 1)

    if (isReplace !== true) {
      this.updator.enqueueUpdate({
        updator: this,
        path: '',
        value: null
      })
    }
    
    child.parentNode = null;
    
    return child
  }

  public dehydrate () {
    return [
      this._templateId,
      this.id,
      this.className,
      this.style,
      this.childNodes.map(child => child.dehydrate()),
    ]
  }

  protected findIndex (childeNodes: TickDOMNode[], refChild: TickDOMNode) {
    const index = childeNodes.indexOf(refChild)

    return index
  }


  
}