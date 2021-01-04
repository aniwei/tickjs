import { MiniProgramTemplateId, ViewDataStruct } from '@tickjs/template';
import { TickDOMNode } from './TickDOMNode';

export class TickDOMViewNode extends TickDOMNode {
  private templateId = MiniProgramTemplateId.VIEW;

  hyrate () {
    return [
      this.templateId,
      this.id,
      this.className,
      this.style,
      this.childNodes.map(child => child.hyrate()),
      
    ]
  }
}