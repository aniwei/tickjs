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
  name: 'tickjs',
  numberOfCycles: 4,
  supportHTMLComponents: true,
  circulateNodeName: 'circulate',
  circulateNodeClassName: '--tickjs-circulate',
  circulateParentNodeClassName: '--tickjs-circulate-parent'
}

export function createWorkerTemplate (options = defaultOptions) {
  let imports: any[] = [
    [MiniProgramComponent.CIRCLATE, createCirculate(options), null],
    [MiniProgramComponent.AUDIO, createAudio(), null],
    [MiniProgramComponent.CANVAS, createCanvas(), null],
    [MiniProgramComponent.CAMERA, createCamera(), null],
  ];

  for (let cursor = 0; cursor < options.numberOfCycles; cursor++) {
    imports = imports.concat([
      [MiniProgramComponent.AUDIO, createAudio(), cursor],
      [MiniProgramComponent.BUTTON, createButton(), cursor],
      [MiniProgramComponent.TEXT, createText(), cursor],
      [MiniProgramComponent.VIEW, createView(), cursor],
    ]);
  
    if (options.supportHTMLComponents) {
      imports = imports.concat([
        [HTMLComponent.H1, new TickTemplateHTMLBlockNode('h1'), cursor],
        [HTMLComponent.H2, new TickTemplateHTMLBlockNode('h2'), cursor],
        [HTMLComponent.H3, new TickTemplateHTMLBlockNode('h3'), cursor],
        [HTMLComponent.H4, new TickTemplateHTMLBlockNode('h4'), cursor],
        [HTMLComponent.H5, new TickTemplateHTMLBlockNode('h5'), cursor],
        [HTMLComponent.H6, new TickTemplateHTMLBlockNode('h6'), cursor],
        [HTMLComponent.DIV, new TickTemplateHTMLBlockNode('div'), cursor],
        [HTMLComponent.P, new TickTemplateHTMLBlockNode('p'), cursor],
        [HTMLComponent.UL, new TickTemplateHTMLBlockNode('ul'), cursor],
        [HTMLComponent.OL, new TickTemplateHTMLBlockNode('ol'), cursor],
        [HTMLComponent.LI, new TickTemplateHTMLBlockNode('li'), cursor],
      ]);
    }
  }

  const workerTemplate = createWorker(imports, defaultOptions);

  return workerTemplate;
}
