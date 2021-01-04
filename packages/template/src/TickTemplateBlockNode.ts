import {
  TagType,
  TickTemplate
} from './TickTemplate';

export class TickTemplateBlockNode extends TickTemplate {
  constructor (templateId) {
    super('block', TagType.OPENNING);
  }
}