import debug from 'debug';

import { 
  MiniProgramMachine,
  MiniProgramContext,
  MiniProgramScript,
  // MiniProgramScriptLoader,
} from './MiniProgram/MiniProgram';

export function runMiniApplication ({
  invokeHandler,
  publishHandler
}) {
  const service = '';
  const application = '';

  const script = new class extends MiniProgramScript {
    public context: MiniProgramContext | null =  null;

    runInThisContext (context: MiniProgramContext) {
      this.context = context;
    }

    evaluateScript (string: string) {
      if (this.context) {
        eval(string);
      }
    }
  };

  const context: MiniProgramContext = {
    WeixinJSCore: {
      invokeHandler,
      publishHandler,
    },

    __wxConfig: {},
  }

  const miniProgram = new MiniProgramMachine(script);

  miniProgram.runInThisContext(context);
  miniProgram.injectScript(service);
  miniProgram.injectScript(application);

  miniProgram.run({

  });
}


runMiniApplication({
  invokeHandler () {},
  publishHandler () {}
})