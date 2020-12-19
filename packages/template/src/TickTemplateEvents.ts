
type Event = {
  eventName: string,
  listenerName: string,
  capture: boolean
}

export class TickTemplateEvents {
  public attributes: Map<string, Event>

  constructor () {
    this.attributes = new Map();
  }

  addEventListener (eventName: any, listenerName: any, capture: boolean = true): void {
    this.attributes.set(eventName, {
      eventName,
      listenerName,
      capture
    })
  }

  removeEventListener (eventName: string): Event | undefined {
    return this.attributes.get(eventName);
  }

  size (): any {
    return this.attributes.size;
  }

  stringify () {
    
  }
}