import compare from 'compare-versions';
import axios from 'axios';

import {
  TICK_NPM
} from '../shared/env'

import { init } from '../commands'

export class TickVersionManager {
  static tickVersionManagerInstance: TickVersionManager | null = null;
  static sharedInstance () {
    if (TickVersionManager.tickVersionManagerInstance === null) {
      TickVersionManager.tickVersionManagerInstance = new TickVersionManager();
    }

    return TickVersionManager.tickVersionManagerInstance
  }

  async forTickUpdate () {
    const result = await axios.get(TICK_NPM);

    console.log(result);
  }

  async getCommandModule () {

  }

  async execCommand (name) {
    init();
  }

  init () {
    return this.command('init', async () => {
      await this.forTickUpdate();
    })
  }

  start () {
    return this.command('start', async () => {
      await this.forTickUpdate();
    })
  }

  command (name, beforeCommandExec?) {
    return async (...argv) => {
      if (typeof beforeCommandExec === 'function') {
        await beforeCommandExec(...argv);
      }

      await this.getCommandModule();
      await this.execCommand(name);
    }
  }

}