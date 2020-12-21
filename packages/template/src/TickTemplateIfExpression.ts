import {
  TagType,
  TickTemplate
} from './TickTemplate';

export class TickTemplateIf extends TickTemplate {
  constructor (condition) {
    super('block', TagType.OPENNING);

    this.setAttribute(
      'wx:if',
      condition
    )
  }
}

export class TickTemplateElseIf extends TickTemplate {
  constructor (condition) {
    super('block', TagType.OPENNING);

    this.setAttribute(
      'wx:elif',
      condition
    )
  }
}

export class TickTemplateElse extends TickTemplate {
  constructor (elseTemplate: TickTemplate) {
    super('block', TagType.OPENNING);

    this.setAttribute(
      'wx:else',
      null
    );

    this.appendChild(elseTemplate);
  }
}

export class TickTemplateIfExpression extends TickTemplate  {
  constructor () {
    super('empty', TagType.OPENNING);
  }

  If (condition: string, ifTemplate: TickTemplate) {
    const ifElement = new TickTemplateIf(condition)
    ifElement.appendChild(ifTemplate);

    this.firstChild = ifElement;

    return this;
  }

  ElseIf (condition: string, elseIfTemplate: TickTemplate) : TickTemplateIfExpression {
    const elseIfElement = new TickTemplateElseIf(condition);

    elseIfElement.appendChild(elseIfTemplate);

    this.appendChild(elseIfElement);

    return this;
  }

  Else (elseTemplatew: TickTemplate) : TickTemplateIfExpression {
    const elseIfElement = new TickTemplateElse(elseTemplatew);
    this.lastChild = elseIfElement;

    return this;
  }

  stringify () {
    return this.childNodes.stringify();
  }
}