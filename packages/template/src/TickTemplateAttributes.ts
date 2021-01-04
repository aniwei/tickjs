import {
  Template
} from './TickTemplate';


type Attribute = {
  keyName: string,
  valueName: string,
  defaultValue: any
}

export enum IngoreAttribute {
  TAGNAME = 'tagName',
  TEMPLATE = 'template'
}

export class TickTemplateAttributes {
  public attributes: Map<string, Attribute>

  constructor () {
    this.attributes = new Map();
  }

  setAttribute (keyName: string, valueName: string, defaultValue: any = null): void {
    this.attributes.set(keyName, {
      keyName,
      valueName,
      defaultValue
    })
  }

  getAttribute (keyName): string | undefined {
    return this.attributes.get(keyName)?.valueName;
  }

  removeAttribute (keyName) {
    return this.attributes.delete(keyName);
  }

  size (): any {
    return this.attributes.size;
  }

  stringify () {
    const template: Template = new Template();
    let count = 1;

    for (const [keyName, attribute] of this.attributes) {
      if (
        keyName === IngoreAttribute.TEMPLATE ||
        keyName === IngoreAttribute.TAGNAME
      ) {
        continue;
      }

      template.next(keyName);
      template.next('=');
      template.next(attribute.valueName);

      if (count < this.attributes.size) {
        template.space();
      }
    }

    return template.stringify();
  }
}