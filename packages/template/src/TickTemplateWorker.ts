import { TickTemplateNode } from './TickTemplateNode';
import { TickTemplateIfExpression } from './TickTemplateIfExpression'
import { DataStruct } from './TickTemplateComponent';
import { TickTemplateLoopNode } from './TickTemplateLoopNode';
import { createTemplate } from './createTemplate';
import { TagType } from './TickTemplate';
import {
  quotate,
  VARIABLE_NAME
} from './shared'


function assign () {
  return quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`)
}

function createComponentsWorker (node) {
  const ifExpressionNode = new TickTemplateIfExpression();
  const isName = `{{${VARIABLE_NAME}[${(DataStruct.TEMPLATE)}]}}`

  ifExpressionNode.If(
    quotate(`{{${VARIABLE_NAME}[${DataStruct.CHILDREN}].length>0}}`)
  );

  const loopNode = new TickTemplateLoopNode(TickTemplateNode.is(quotate(isName), assign()))

  ifExpressionNode.firstChild?.merge(loopNode)

  node.appendChild(ifExpressionNode);
}

function createComponents (imports, workTemplate: TickTemplateNode, options) {
  for (const [node, cursor] of imports) {
    const name = `${node.getAttribute('template')}.${cursor}`;
    const template = createTemplate(quotate(name));

    if (node.tag.type === TagType.OPENNING) {
      createComponentsWorker(node);
    }

    template.appendChild(node)
    workTemplate.appendChild(template);
  }
}

export const defaultWorkerOptions = {
  numberOfCycles: 5,
  circulateNodeName: 'circulate',
  beautify: true,
  prefix: '',
  name: 'tickjs'
}

export function createWorker (imports: any[], options = defaultWorkerOptions) {  
  const workerTemplate = TickTemplateNode.define(quotate(`${options.prefix}.${options.name}`));
  
  createComponents(imports, workerTemplate, options);

  const isName = `{{${VARIABLE_NAME}[${(DataStruct.TEMPLATE)}]}}`
  
  workerTemplate.appendChild(
    new TickTemplateLoopNode(
      TickTemplateNode.is(quotate(isName), assign())
    )
  );

  return workerTemplate;
}


