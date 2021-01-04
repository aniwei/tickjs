import {
  NodeType,
} from './shared';

import {
  TickDOMNodeUpdator
} from './TickDOMNodeUpdator'

import {
  TickDOMStyle
} from './TickDOMStyle';

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

  private _style: TickDOMStyle | null = null

  public constructor (nodeType: NodeType, nodeName: string) {
    this.nodeType = nodeType
    this.nodeName = nodeName
    this.updator = TickDOMNodeUpdator;
  }

  public get style (): TickDOMStyle | null {
    return this._style || (this._style = new TickDOMStyle());
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

    if (qualifiedName === 'style') {
      this.style.cssText = value as string
      qualifiedName = Shortcuts.Style
    } else if (qualifiedName === 'id') {
      eventSource.delete(this.uid)
      this.props[qualifiedName] = this.uid = value as string
      eventSource.set(value as string, this)
      qualifiedName = 'uid'
    } else {
      this.props[qualifiedName] = value as string
      if (qualifiedName === 'class') {
        qualifiedName = Shortcuts.Class
      }
      if (qualifiedName.startsWith('data-')) {
        if (this.dataset === EMPTY_OBJ) {
          this.dataset = Object.create(null)
        }
        this.dataset[toCamelCase(qualifiedName.replace(/^data-/, ''))] = value
      }
    }

    this.enqueueUpdate({
      path: `${this._path}.${toCamelCase(qualifiedName)}`,
      value
    })
  }

  public removeAttribute (qualifiedName: string) {
    if (qualifiedName === 'style') {
      this.style.cssText = ''
    } else {
      delete this.props[qualifiedName]
    }

    CurrentReconciler.removeAttribute?.(this, qualifiedName)

    this.enqueueUpdate({
      path: `${this._path}.${toCamelCase(qualifiedName)}`,
      value: ''
    })
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

  protected findIndex (childeNodes: TickDOMNode[], refChild: TickDOMNode) {
    const index = childeNodes.indexOf(refChild)

    return index
  }

  
}