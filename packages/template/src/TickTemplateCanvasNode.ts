import {
  MiniProgramTemplateID,
  TickTemplateClosingComponent,
  DataStruct
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum CanvasDataStruct {
  TYPE = 5,
  CANVAS_ID,
  WEBP,
  DISABLE_SCROLL
}

export function createCanvas () {
  const canvas = new TickTemplateCanvasNode();

  return canvas;
}

export class TickTemplateCanvasNode extends TickTemplateClosingComponent {
  static defaultProps = [
    ['type', variable(CanvasDataStruct.TYPE), null],
    ['canvas-id', variable(CanvasDataStruct.CANVAS_ID), null],
    ['webp', variable(CanvasDataStruct.WEBP), null], 
    ['disable-scroll', variable(CanvasDataStruct.DISABLE_SCROLL), false], 
  ];

  static defaultEvents = [
  ];

  constructor () {
    super(
      'canvas', 
      TickTemplateCanvasNode.defaultProps, 
      TickTemplateCanvasNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.CANVAS)
  }
}

export const canvas: TickTemplateCanvasNode = createCanvas();