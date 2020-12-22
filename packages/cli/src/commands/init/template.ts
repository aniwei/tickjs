import {
  quotate,
  createAudio,
  createButton,
  createCamera,
  createCanvas,
  createView,
  createText,
  createCirculate,
  createWorker,
  createTemplate,
  TickTemplateNode,
  TickTemplateHTMLBlockNode,
  defaultWorkerOptions,
  VARIABLE_NAME
} from '@tickjs/template';


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
  P = 'p',
  UL = 'ul',
  OL = 'ol',
  LI = 'li',
  SPAN = 'span',
  I = 'i'
}

const defaultOptions = {
  ...defaultWorkerOptions,
  numberOfCycles: 4,
  supportHTMLComponents: true,
  circulateNodeName: 'circulate',
  circulateNodeClassName: '--tickjs-circulate',
  circulateParentNodeClassName: '--tickjs-circulate-parent'
}

export function createWorkerTemplate (options = defaultOptions) {
  const template = createTemplate(quotate('tickjs'));

  for (let i = 0; i < options.numberOfCycles; i++) {
    let imports: any[] = [
      [MiniProgramComponent.AUDIO, createAudio()],
      [MiniProgramComponent.BUTTON, createButton()],
      [MiniProgramComponent.CANVAS, createCanvas()],
      [MiniProgramComponent.CAMERA, createCamera()],
      [MiniProgramComponent.CIRCLATE, createCirculate(options)],
      [MiniProgramComponent.TEXT, createText()],
      [MiniProgramComponent.VIEW, createView()],
    ];
  
    if (options.supportHTMLComponents) {
      imports = imports.concat([
        [HTMLComponent.H1, new TickTemplateHTMLBlockNode('h1')],
        [HTMLComponent.H2, new TickTemplateHTMLBlockNode('h2')],
        [HTMLComponent.H3, new TickTemplateHTMLBlockNode('h3')],
        [HTMLComponent.H4, new TickTemplateHTMLBlockNode('h4')],
        [HTMLComponent.H5, new TickTemplateHTMLBlockNode('h5')],
        [HTMLComponent.H6, new TickTemplateHTMLBlockNode('h6')],
        [HTMLComponent.DIV, new TickTemplateHTMLBlockNode('div')],
        [HTMLComponent.P, new TickTemplateHTMLBlockNode('p')],
        [HTMLComponent.UL, new TickTemplateHTMLBlockNode('ul')],
        [HTMLComponent.OL, new TickTemplateHTMLBlockNode('ol')],
        [HTMLComponent.LI, new TickTemplateHTMLBlockNode('li')],
      ]);
    }

    const workerTemplate = createWorker(i, imports);
    template.appendChild(workerTemplate);
  }

  const eofTemplate = TickTemplateNode.define(
    quotate(`${options.prefix}.${options.numberOfCycles}`)
  );

  eofTemplate.appendChild(createCirculate(options))
  template.appendChild(eofTemplate);

  template.appendChild(
    TickTemplateNode.is(
      quotate(`${options.prefix}.0`), 
      quotate(`{{${VARIABLE_NAME}:${VARIABLE_NAME}}}`)
    )
  )

  return template;e
}
