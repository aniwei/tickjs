import {
  TickTemplateBlockNode
} from './TickTemplateBlockNode';

import {
  TickTemplateNode
} from './TickTemplateNode';

import {
  quotate,
  VARIABLE_NAME,
} from './shared'

export class TickTemplateCirculateNode extends TickTemplateBlockNode {
  constructor (cursor: number, options) {
    super();

    this.appendChild(TickTemplateNode.is(
      `${options.prefix}.${cursor}`, 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`))
    )
  }
}

