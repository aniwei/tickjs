import { EventEmitter } from 'events';
import { MiniProgramRenderLayer } from '../RenderLayer';
import { MiniProgramServiceLayer } from '../ServiceLayer';

export abstract class MiniProgramNativeLayer extends EventEmitter {
  public config: any | null = null;
  public service: MiniProgramServiceLayer | null = null;
  public renderer: MiniProgramRenderLayer | null = null;

  constructor ({ service, renderer }) {
    super();

    this.service = service;
    this.renderer = renderer;

    this.service?.injectContext('WeixinJSCore', {
      invokeHandler: (...argv) => {
        this.invokeHandlerFromService && this.invokeHandlerFromService(...argv)
      },
      publishHandler: (...argv) => {
        this.invokeHandlerFromService && this.invokeHandlerFromService(...argv)
      }
    });

    this.renderer?.injectContext('WeixinJSCore', {
      invokeHandler: (...argv) => {
        this.invokeHandlerFromView && this.invokeHandlerFromView(...argv)
      },
      publishHandler: (...argv) => {
        this.publishHandlerFromView && this.publishHandlerFromView(...argv)
      }
    });
  }

  public abstract launch (options);

  public abstract invokeHandlerFromService;
  public abstract publishHandlerFromService;

  public abstract invokeHandlerFromView;
  public abstract publishHandlerFromView;
}
