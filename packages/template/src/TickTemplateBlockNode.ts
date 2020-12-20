import {
  TagType,
  TickTemplate
} from './TickTemplate';

export class TickTemplateBlockNode extends TickTemplate {
  constructor () {
    super('block', TagType.OPENNING);
  }
}