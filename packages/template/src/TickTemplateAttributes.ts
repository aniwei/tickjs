
type Attribute = {
  keyName: string,
  valueName: string,
  defaultValue: any
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

  getAttribute (keyName): Attribute | undefined {
    return this.attributes.get(keyName);
  }

  size (): any {
    return this.attributes.size;
  }

  stringify () {
    
  }
}