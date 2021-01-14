import {
  createAudio,
  createButton,
  createCamera,
  createCanvas,
  createView,
  createText,
  createImage,
  createInput,
  createPicker,
  createPickerView,
  createPickerViewColumn,
  createScrollView,
  createSwiper,
  createSwiperItem,
  createTextArea,
  createCirculate,
  createWorker,
  TickTemplateHTMLBlockNode,
  defaultWorkerOptions,
  MiniProgramTemplateID,
} from '@tickjs/template';

enum HTMLComponent {
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

enum HTMLComponentTemplateId {
  H1 = MiniProgramTemplateID.AUDIO + 1,
  H2,
  H3,
  DIV
}

const defaultOptions = {
  ...defaultWorkerOptions,
  name: 'tickjs',
  numberOfCycles: 16,
  supportHTMLComponents: true,
  circulateNodeName: 'circulate',
  circulateNodeClassName: '--tickjs-circulate',
  circulateParentNodeClassName: '--tickjs-circulate-parent'
}

export const template = new class {
  async clean () {
    
  }
}

export function createWorkerTemplate (options = defaultOptions) {
  let imports: any[] = [
    [createCirculate(options), 0],
    [createAudio(), 0],
    [createCanvas(), 0],
    [createCamera(), 0],
    [createImage(), 0],
    [createInput(), 0],
    [createPicker(), 0],
    [createPickerView(), 0],
    [createPickerViewColumn(), 0],
    [createScrollView(), 0],
    [createSwiper(), 0],
    [createSwiperItem(), 0],
    [createTextArea(), 0],
  ];

  for (let cursor = 0; cursor < options.numberOfCycles; cursor++) {
    imports = imports.concat([
      [createView(), cursor],
      [createButton(), cursor],
      [createText(), cursor],
    ]);
  
    if (options.supportHTMLComponents) {
      imports = imports.concat([
        [new TickTemplateHTMLBlockNode(HTMLComponent.H1, HTMLComponentTemplateId.H1), cursor],
        [new TickTemplateHTMLBlockNode(HTMLComponent.H2, HTMLComponentTemplateId.H2), cursor],
        [new TickTemplateHTMLBlockNode(HTMLComponent.DIV, HTMLComponentTemplateId.DIV), cursor],
      ])
    }
  }

  const workerTemplate = createWorker(imports, defaultOptions);

  return workerTemplate;
}
