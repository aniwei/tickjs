import { EventEmitter } from 'events';
import { MiniProgramNativeLayer } from './index'
import { MiniProgramRenderLayer } from '../RenderLayer';
import { MiniProgramServiceLayerNodeImpl } from '../ServiceLayer';

export class MiniProgramNativeLayerNodeImpl extends MiniProgramNativeLayer {
  static launch (options) {
    const miniProgram = new MiniProgramNativeLayerNodeImpl(options);

    miniProgram.launch(options);

    return miniProgram;
  }

  async launch (options) {
    await this.service?.launch(options);
    await this.renderer?.launch(options);

    const { id } = await this.renderer?.navigate(options.appLaunchInfo);
    this.service?.navigate(options.appLaunchInfo, id);
  }

  invokeHandlerFromService = () => {}
  publishHandlerFromService = () => {}

  invokeHandlerFromView = () => {}
  publishHandlerFromView = () => {}
}
