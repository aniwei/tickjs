import debug from 'debug';
import { EventEmitter } from 'events';
import puppeteer from 'puppeteer';

import Page from './Page'

class Program extends EventEmitter {
  constructor () {
    super();

    this.on('publish', this.onPublish);
    this.on('invoke', this.onInvoke);


  }

  onInvoke = (event) => {
    const { target } = event;

    this.invoke(event.type, event);
  }

  onPublish = (event) => {
    const { target } = event;

    this.publish(event.type, event);
  }

  public config () {}
  public unpack () {}
  public source (sources) {
    
  }

  public launch (appLaunchInfo) {
    this.invoke('launch', appLaunchInfo);
  }

  public publish (name, callback) {
    if (typeof callback === 'function') {
      this.on(`publish${name}`, callback);
    } else {
      this.emit(`publish${name}`, callback);
    }
  }

  public invoke (name, callback) {
    if (typeof callback === 'function') {
      this.on(`invoke${name}`, callback);
    } else {
      this.emit(`invoke${name}`, callback);
    }
  }
}

class Service extends EventEmitter {
  public subscribe (name, callback) {
    if (typeof callback === 'function') {
      this.on(`subscribe${name}`, callback);
    } else {
      this.emit(`subscribe${name}`, [name, ...callback]);
    }
  }
}

export function program () {
  const program =  new Program();
  const page = new Page();
  const service = new Service();
  
  program.invoke('launch', async (appLaunchInfo) => {
    const { id } = await page.create();

    service.subscribe('onAppRoute', [{}, id]);

  });

  program.publish('onAppRoute', () => {
    page.current.subscribe('onApp')
  })

  return program;
}

export default program;