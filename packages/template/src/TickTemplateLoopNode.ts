import {
  TickTemplateBlockNode,
} from './TickTemplateBlockNode'
import {
  TagType,
  TickTemplate
} from './TickTemplate';

import {
  DataStruct
} from './TickTemplateComponent'

import {
  quotate,
  variable,
  VARIABLE_NAME
} from './shared'

export class TickTemplateLoopNode extends TickTemplate {
  constructor (loopElement) {
    super('block', TagType.OPENNING);

    this.setAttribute('wx:for', variable(DataStruct.CHILDREN));
    this.setAttribute('wx:key', quotate('index'));
    this.setAttribute('wx:for-item', quotate(VARIABLE_NAME));

    this.appendChild(loopElement);
  }
}
