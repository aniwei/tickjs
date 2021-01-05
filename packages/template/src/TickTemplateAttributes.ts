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

export class TickTemplateAttributes extends Map {


  setAttribute (keyName: string, valueName: string, defaultValue: any = null): void {
    this.set(keyName, {
      keyName,
      valueName,
      defaultValue
    })
  }

  getAttribute (keyName): string | undefined {
    return this.get(keyName)?.valueName;
  }

  removeAttribute (keyName) {
    return this.delete(keyName);
  }

  stringify () {
    const template: Template = new Template();
    let count = 1;

    for (const [keyName, attribute] of this) {
      if (
        keyName === IngoreAttribute.TEMPLATE ||
        keyName === IngoreAttribute.TAGNAME
      ) {
        continue;
      }

      template.next(keyName);
      template.next('=');
      template.next(attribute.valueName);

      if (count < this.size) {
        template.space();
      }
    }

    return template.stringify();
  }
}