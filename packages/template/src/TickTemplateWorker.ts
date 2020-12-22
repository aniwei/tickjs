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
  return quotate(`{{${VARIABLE_NAME}[${DataStruct.TAGNAME}]=='${tagName}'}}`);
}

function createBeginWork (imports, options?) {
  const beginWorkTemplate = TickTemplateNode.define(quotate('beginWork'));
  const ifExpressionNode = new TickTemplateIfExpression();

  for (let i = 0; i < imports.length; i++) {
    const [tagName] = imports[i];

    if (i === 0) {
      ifExpressionNode.If(
        isEqualTagName(tagName),
        TickTemplateNode.is(quotate(tagName), assign())
      );
    } else {
      ifExpressionNode.ElseIf(
        isEqualTagName(tagName),
        TickTemplateNode.is(quotate(tagName), assign())
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

function createComponents (cursor: number, imports, workTemplate: TickTemplateNode, options) {
  for (const [tagName, node] of imports) {
    const template = createTemplate(quotate(tagName));

    if (node.tag.type === TagType.OPENNING) {
      node.appendChild(  
        TickTemplateNode.is(
          quotate(`${options.prefix}.${cursor + 1}`), 
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
  prefix: ''
}

export function createWorker (cursor: number, imports: any[], options = defaultWorkerOptions) {
  const workerTemplate = TickTemplateNode.define(quotate(`${defaultWorkerOptions.prefix}.${cursor}`));
  
  createComponents(cursor, imports, workerTemplate, options);
  
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


