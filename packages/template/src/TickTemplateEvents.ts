import {
  Template
} from './TickTemplate'


type Event = {
  eventName: string,
  listenerName: string,
  capture: boolean
}

export class TickTemplateEvents {
  public events: Map<string, Event>

  constructor () {
    this.events = new Map();
  }

  addEventListener (eventName: any, listenerName: any, capture: boolean = true): void {
    this.events.set(eventName, {
      eventName,
      listenerName,
      capture
    })
  }

  removeEventListener (eventName: string): Event | undefined {
    return this.events.get(eventName);
  }

  size (): any {
    return this.events.size;
  }

  stringify () {
    const template: Template = new Template();
    for (const [keyName, event] of this.events) {
      template.next(event.capture ? 'catch:' : 'bind:');
      template.next(keyName);
      template.next('=');
      template.next(event.listenerName);
      template.space();
    }

    return template.stringify();
  }
}