import {
  TagType,
  TickTemplate
} from './TickTemplate';

export class TickTemplateIf extends TickTemplate {
  constructor (condition, tagName: string = 'block') {
    super(tagName, TagType.OPENNING);

    this.setAttribute(
      'wx:if',
      condition
    )
  }
}

export class TickTemplateElseIf extends TickTemplate {
  constructor (condition, tagName: string = 'block') {
    super(tagName, TagType.OPENNING);

    this.setAttribute(
      'wx:elif',
      condition
    )
  }
}

export class TickTemplateElse extends TickTemplate {
  constructor (elseTemplate: TickTemplate | Map<string, string>, tagName: string = 'block') {
    super(tagName, TagType.OPENNING);

    this.setAttribute(
      'wx:else',
      null
    );

    if (elseTemplate instanceof TickTemplate) {
      this.appendChild(elseTemplate);
    } else {
      for (const [key, value] of elseTemplate) {
        this.setAttribute(
          key,
          value
        )
      }
    }

  }
}

export class TickTemplateIfExpression extends TickTemplate  {
  constructor () {
    super('empty', TagType.OPENNING);
  }

  If (condition: string, ifTemplate: TickTemplate | Map<string, string>, tagName?: string) {
    const ifNode = new TickTemplateIf(condition, tagName)

    if (ifTemplate instanceof TickTemplate) {
      ifNode.appendChild(ifTemplate);
    } else {
      for (const [key, value] of ifTemplate) {
        ifNode.setAttribute(
          key,
          value
        )
      }
    }

    this.firstChild = ifNode;

    return this;
  }

  ElseIf (condition: string, elseIfTemplate: TickTemplate | Map<string, string>, tagName?: string) : TickTemplateIfExpression {
    const elseIfNode = new TickTemplateElseIf(condition, tagName);

    if (elseIfTemplate instanceof TickTemplate) {
      elseIfNode.appendChild(elseIfTemplate);
    } else {
      for (const [key, value] of elseIfTemplate) {
        elseIfNode.setAttribute(
          key,
          value
        )
      }
    }

    this.appendChild(elseIfNode);

    return this;
  }

  Else (elseTemplatew: TickTemplate | Map<string, string>, tagName?: string) : TickTemplateIfExpression {
    const elseNode = new TickTemplateElse(elseTemplatew, tagName);
    this.lastChild = elseNode;

    return this;
  }

  stringify () {
    return this.childNodes.stringify();
  }
}