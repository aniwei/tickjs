import {
  quotate,
  audio,
  button,
  camera,
  canvas,
  circlate,
  view,
  text,
  createWorker,
  createTemplate,
  TickTemplateNode,
  TickTemplateHTMLBlockNode,
  defaultWorkerOptions,
  VARIABLE_NAME
} from '@tickjs/template';

import * as env from '../../shared/env';

enum MiniProgramComponent {
  AUDIO = 'audio',
  BUTTON = 'button',
  CANVAS = 'canvas',
  CAMERA = 'camera',
  CIRCLATE = 'circlate',
  TEXT = 'text',
  VIEW = 'view',
}

enum HTMLComponent {
  HEAD = 'head',
  BODY = 'body',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  DIV = 'div',
  SPAN = 'span',
  I = 'i'
}

const defaultOptions = {
  ...defaultWorkerOptions,
  supportHTMLComponents: false
}


export function createWorkerTemplate (options = defaultOptions) {
  let imports: any[] = [
    [MiniProgramComponent.AUDIO, audio],
    [MiniProgramComponent.BUTTON, button],
    [MiniProgramComponent.CANVAS, canvas],
    [MiniProgramComponent.CAMERA, camera],
    [MiniProgramComponent.CIRCLATE, circlate],
    [MiniProgramComponent.TEXT, text],
    [MiniProgramComponent.VIEW, view],
  ];

  if (options.supportHTMLComponents) {
    imports = imports.concat([
      [HTMLComponent.H1, new TickTemplateHTMLBlockNode('h1')],
      [HTMLComponent.H2, new TickTemplateHTMLBlockNode('h2')],
      [HTMLComponent.H3, new TickTemplateHTMLBlockNode('h3')],
      [HTMLComponent.H4, new TickTemplateHTMLBlockNode('h4')],
      [HTMLComponent.H5, new TickTemplateHTMLBlockNode('h5')],
      [HTMLComponent.H6, new TickTemplateHTMLBlockNode('h6')],
    ]);
  }
  
  const template = createTemplate(quotate('tickjs'));

  for (let i = 0; i < options.numberOfCycles; i++) {
    const workerTemplate = createWorker(i, imports);
    template.appendChild(workerTemplate);
  }

  template.appendChild(
    TickTemplateNode.is(
      quotate(`${options.prefix}.0`), 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`)
    )
  )

  return template;
}
