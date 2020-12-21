import {
  TickTemplateNode
} from './TickTemplateNode';
import {
  quotate,
  VARIABLE_NAME,
} from './shared'
import { 
  TagType,
  TickTemplate
 } from './TickTemplate';

export class TickTemplateCirculateNode extends TickTemplate {
  constructor (cursor: number, options) {
    super(options.circulateNodeName, TagType.CLOSING);

    this.appendChild(TickTemplateNode.is(
      `${options.prefix}.${cursor}`, 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`))
    )
  }
}

