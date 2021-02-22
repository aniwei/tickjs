import { MiniProgramViewLayer, MiniProgramRenderLayer } from './index'

export class MiniProgramViewLayerNodeImpl extends MiniProgramViewLayer {

  constructor (owner) {
    super(owner);


  }

  async open () {

  }

  async runInContext (context) {
    for (const [name, value] of context) {
      const type = typeof value;

      switch (type) {
        case 'string': {
          await this.instance?.evaluate(`window[${name}]=${value};`);
          break;
        }

        case 'function': {
          await this.instance?.exposeFunction(name, value);
          break;
        }
      }
    }
  }
}