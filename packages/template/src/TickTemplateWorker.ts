import {
  TagType,
  TickTemplate
} from './TickTemplate';

import {
  TickTemplateOpenningComponent
} from './TickTemplateComponent'

import {
  TickTemplateImportElement
} from './TickTemplateImportElement'
import { 
  TickTemplateNode 
} from './TickTemplateNode';

import {
  quotate,
  variable,
  VARIABLE_NAME
} from './shared'

import {
  TickTemplateIfExpression
} from './TickTemplateIfExpression'

import {
  DataStruct
} from './TickTemplateComponent';

import {
  TickTemplateLoopNode
} from './TickTemplateLoopNode';


export function createWorker (workerName: string, imports: string[]) {
  const workerTemplate = TickTemplateNode.define(workerName);

  for (const [src] of imports) {
    const importNode = new TickTemplateImportElement();

    importNode.src = src;

    workerTemplate.appendChild(importNode);    
  }

  const beginWorkTemplate = createBeginWork();
  const workLoopTemplate = createWorkLoop();

  workerTemplate.appendChild(beginWorkTemplate);
  workerTemplate.appendChild(workLoopTemplate);

  workLoopTemplate.appendChild(
    TickTemplateNode.is(
      quotate('beginWork'), 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`)
    )
  )

  workLoopTemplate.appendChild(
    TickTemplateNode.is(
      quotate('workLoop'), 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`)
    )
  );

  return workerTemplate;
}

function assign () {
  return quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`)
}

function isEqualTagName (tagName) {
  return quotate(`{{${VARIABLE_NAME}[${DataStruct.TAGNAME}] == '${tagName}'}}`);
}

function createBeginWork () {
  const beginWorkTemplate = TickTemplateNode.define(quotate('beginWork'));

  const ifExpressionNode = new TickTemplateIfExpression();

  ifExpressionNode.If(
    isEqualTagName('text'),
    TickTemplateNode.is(quotate('text'), assign())
  );

  ifExpressionNode.ElseIf(
    isEqualTagName('html'),
    TickTemplateNode.is(quotate('html'), assign())
  );

  ifExpressionNode.ElseIf(
    isEqualTagName('view'),
    TickTemplateNode.is(quotate('view'), assign())
  );

  ifExpressionNode.ElseIf(
    isEqualTagName('html'),
    TickTemplateNode.is(quotate('html'), assign())
  );

  beginWorkTemplate.appendChild(ifExpressionNode)

  return beginWorkTemplate;
}

function createWorkLoop () {
  const workLoopTemplate = TickTemplateNode.define(quotate('workLoop'));

  const ifExpressionNode = new TickTemplateIfExpression();

  ifExpressionNode.If(
    quotate(`{{${VARIABLE_NAME}[${DataStruct.CHILDREN}].length > 0}}`), 
    new TickTemplateLoopNode(
      TickTemplateNode.is(quotate('beginWork'), assign())
    )
  )

  workLoopTemplate.appendChild(ifExpressionNode)

  return workLoopTemplate;
}
