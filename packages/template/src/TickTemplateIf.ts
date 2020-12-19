import {
  TickTemplateBlockElement,
} from './TickTemplateBlockElement'
import {
  TickTemplateElement
} from './TickTemplateElement';
import { brackets, Children, Key } from './TickTemplateDataStruct'

export class TickTemplateIf {
  public blockElement: TickTemplateBlockElement;

  constructor (condition) {
    this.blockElement = new TickTemplateBlockElement();
    this.blockElement.setAttribute(
      'wx:if',
      condition
    )
  }
}

export class TickTemplateIfExpressionElement extends TickTemplateElement  {
  If (condition: string) {
    const ifElement = new TickTemplateIf(condition)
    this.firstChild = ifElement;
  }
}