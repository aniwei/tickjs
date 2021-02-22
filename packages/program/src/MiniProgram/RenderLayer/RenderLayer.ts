import debug from 'debug';
import puppeteer from 'puppeteer';
import { EventEmitter } from 'events';

import { MiniProgramServiceLayer } from '../ServiceLayer/ServiceLayer'

let MiniProgramViewLayerId = 1;

export abstract class MiniProgramViewLayer extends EventEmitter {
  public owner: MiniProgramRenderLayer | null = null;
  public id: number | string | null = null;
  public instance: puppeteer.Page | null = null;
  public context: Map<string, any> = new Map;

  constructor (owner) {
    super();

    this.id = MiniProgramViewLayerId++;
    this.owner = owner;
  }

  abstract runInContext (context);
  public abstract evaluateScript (code, filename);
}

export abstract class MiniProgramRenderLayer extends EventEmitter {
  public html: string | null = null;
  public views: any[] = [];
  public owner: MiniProgramServiceLayer | null = null;
  public current: MiniProgramViewLayer | null = null;

  public context: Map<string, any> = new Map;

  public abstract evaluateScript (code, filename);
  public abstract launch (options);
  public abstract navigate (options): any;
  public abstract newView (): any;
  
  public injectContext (name: string, value: any) {
    this.context.set(name, value);
  }
}

