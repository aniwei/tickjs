import {
  TagType,
  TickTemplate
} from './TickTemplate';

export class TickTemplateImportNode extends TickTemplate {
  constructor () {
    super('import', TagType.CLOSING);
  }

  set src (uri: string) {
    this.setAttribute(
      'src',
      uri
    );
  }
}

