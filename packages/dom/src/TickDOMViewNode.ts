import { 
  MiniProgramTemplateId, 
  viewDefaultProps, 
  viewDefaultEvents,
} from '@tickjs/struct';
import { dehydrateEvents, dehydrateProps } from './shared';
import { TickDOMNode } from './TickDOMNode';

export class TickDOMViewNode extends TickDOMNode {
  protected _templateId = MiniProgramTemplateId.VIEW;

  dehydrate () {
    return super.dehydrate().concat(
      dehydrateProps(this, viewDefaultProps),
      dehydrateEvents(this, viewDefaultEvents),
    )
  }
}