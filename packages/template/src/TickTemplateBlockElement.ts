import {
  TagType,
  TickTemplateElement
} from './TickTemplateElement';

export class TickTemplateBlockElement extends TickTemplateElement {
  constructor () {
    super('block', TagType.OPENNING);
  }
}