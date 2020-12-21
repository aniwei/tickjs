import {
  TickTemplateNode
} from './TickTemplateNode';
import {
  quotate,
  variable,
  VARIABLE_NAME,
} from './shared'
import { 
  TickTemplateClosingComponent 
} from './TickTemplateComponent';

enum DataStruct {
  I = 5
}

export const CirculateDataStruct = DataStruct

export function createCirculate (options) {
  const circulateNode = new TickTemplateCirculateNode(options);

  return circulateNode;
} 

export class TickTemplateCirculateNode extends TickTemplateClosingComponent {
  constructor (options) {
    super(options.circulateNodeName);

    this.setAttribute('i', quotate('{{i}}'))
    this.setAttribute('class', quotate(options.circulateNodeClassName));

    this.removeAttribute('style');

    this.appendChild(TickTemplateNode.is(
      `${options.prefix}.${0}`, 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`))
    )
  }
}

