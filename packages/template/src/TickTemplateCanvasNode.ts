import {
  TickTemplateClosingComponent,
} from './TickTemplateComponent';

import {
  variable
} from './shared'

enum DataStruct {
  TYPE = 6,
  CANVAS_ID,
  WEBP,
  DISABLE_SCROLL
}

export const CanvasDataStruct = DataStruct;

export function createCanvas () {
  const canvas = new TickTemplateCanvasNode();

  return canvas;
}

export class TickTemplateCanvasNode extends TickTemplateClosingComponent {
  static defaultProps = [
    ['type', variable(DataStruct.TYPE), null],
    ['canvas-id', variable(DataStruct.CANVAS_ID), null],
    ['webp', variable(DataStruct.WEBP), null], 
    ['disable-scroll', variable(DataStruct.DISABLE_SCROLL), false], 
  ];

  static defaultEvents = [
  ];

  constructor () {
    super(
      'canvas', 
      TickTemplateCanvasNode.defaultProps, 
      TickTemplateCanvasNode.defaultEvents
    );
  }
}

export const canvas: TickTemplateCanvasNode = createCanvas();