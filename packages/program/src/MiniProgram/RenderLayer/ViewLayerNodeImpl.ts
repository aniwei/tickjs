import fs from 'fs-extra';
import { resolve } from 'path';
import { MiniProgramViewLayer, MiniProgramRenderLayer } from './RenderLayer';

const SDKFilePath = (resolve(__dirname, '../WASDK'));
const WAWebviewJavaScriptString = fs.readFileSync(resolve(SDKFilePath, 'WAWebview.js')).toString();


export class MiniProgramViewLayerNodeImpl extends MiniProgramViewLayer {
  public async evaluateScript (code, filename) {
    debugger;
    await this.instance?.evaluate(code + `\n//# sourceURL=${filename}`);
  }

  async open () {
    this.instance = await this.owner?.newView();
  }

  async runInContext (context) {
    for (const [name, value] of context) {
      const type = typeof value;

      switch (type) {
        case 'string': {
          debugger;
          await this.instance?.evaluate(`window['${name}']=${value};`);
          break;
        }

        case 'function': {
          await this.instance?.exposeFunction(name, value);
          break;
        }
      }
    }

    await this.evaluateScript(WAWebviewJavaScriptString, 'WAWebview.js');
  }
}