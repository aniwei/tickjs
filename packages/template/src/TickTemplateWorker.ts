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

function isEqualTagName (tagName) {
  return quotate(`{{${VARIABLE_NAME}[${DataStruct.TEMPLATE}]=='${tagName}'}}`);
}

function createBeginWork (imports, options?) {
  const beginWorkTemplate = TickTemplateNode.define(quotate('beginWork'));
  const ifExpressionNode = new TickTemplateIfExpression();

  for (let i = 0; i < imports.length; i++) {
    const [tagName, node, cursor] = imports[i];
    const attributes =  new Map();

    attributes.set('data', assign());

    const templateName = typeof cursor === 'number' ? 
      `${tagName}.${cursor}` : 
      tagName;

    attributes.set('is', quotate(templateName));

    if (i === 0) {
      ifExpressionNode.If(
        isEqualTagName(templateName),
        attributes,
        'template'
      );
    } else {
      ifExpressionNode.ElseIf(
        isEqualTagName(templateName),
        attributes,
        'template'
      );
    }
  }

  beginWorkTemplate.appendChild(ifExpressionNode)

  return beginWorkTemplate;
}

function createWorkLoop () {
  const workLoopTemplate = TickTemplateNode.define(quotate('workLoop'));
  const ifExpressionNode = new TickTemplateIfExpression();

  ifExpressionNode.If(
    quotate(`{{${VARIABLE_NAME}[${DataStruct.CHILDREN}].length>0}}`), 
    new TickTemplateLoopNode(
      TickTemplateNode.is(quotate('beginWork'), assign())
    )
  )

  workLoopTemplate.appendChild(ifExpressionNode)

  return workLoopTemplate;
}

function createComponents (imports, workTemplate: TickTemplateNode, options) {
  for (const [tagName, node, cursor] of imports) {
    const name = typeof cursor === 'number' ?
      `${tagName}.${cursor}` : tagName;

    const template = createTemplate(quotate(name));

    if (node.tag.type === TagType.OPENNING) {
      node.appendChild(  
        TickTemplateNode.is(
          quotate(
            cursor === options.numberOfCycles - 1 ?
              `${options.prefix}.${options.name}` :
              `${tagName}.${cursor + 1}`
          ), 
          assign()
        )
      );
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
  
  const beginWorkTemplate = createBeginWork(imports);
  const workLoopTemplate = createWorkLoop();

  workerTemplate.appendChild(beginWorkTemplate);
  workerTemplate.appendChild(workLoopTemplate);

  workerTemplate.appendChild(
    TickTemplateNode.is(
      quotate('workLoop'), 
      assign()
    )
  );

  return workerTemplate;
}


