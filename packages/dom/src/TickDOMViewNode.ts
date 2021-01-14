import { 
  MiniProgramTemplateID, 
  viewDefaultProps, 
  viewDefaultEvents,
} from '@tickjs/struct';
import { dehydrateEvents, dehydrateProps } from './shared';
import { TickDOMNode } from './TickDOMNode';

export class TickDOMViewNode extends TickDOMNode {
  protected _templateId = MiniProgramTemplateID.VIEW;

  dehydrate () {
    return super.dehydrate().concat(
      dehydrateProps(this, viewDefaultProps),
      dehydrateEvents(this, viewDefaultEvents),
    )
  }
}