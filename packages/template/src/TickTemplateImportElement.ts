import {
  TagType,
  TickTemplateElement
} from './TickTemplateElement';

export class TickTemplateBlockElement extends TickTemplateElement {
  constructor () {
    super('import', TagType.CLOSING);
  }
}