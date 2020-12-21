import {
  TagType,
  TickTemplate
} from './TickTemplate';

export class TickTemplateNode extends TickTemplate {
  static is (templateName: string, data: string): TickTemplateNode {
    const templateNode = new TickTemplateNode();

    templateNode.tag.type = TagType.CLOSING;

    templateNode.setAttribute(
      'is',
      templateName
    );

    templateNode.setAttribute(
      'data',
      data
    )

    return templateNode;
  }

  static define (templateName: string): TickTemplateNode {
    const templateNode = new TickTemplateNode();

    templateNode.setAttribute(
      'name',
      templateName
    );


    return templateNode;
  }

  constructor () {
    super('template', TagType.OPENNING);
  }
}