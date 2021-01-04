import {
  canvasDefaultProps,
  canvasDefaultEvents,
} from '@tickjs/struct'
import {
  MiniProgramTemplateID,
  TickTemplateClosingComponent,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createCanvas () {
  const canvas = new TickTemplateCanvasNode();

  return canvas;
}

export class TickTemplateCanvasNode extends TickTemplateClosingComponent {
  static defaultProps = canvasDefaultProps.map(transformDefaultProps)
  static defaultEvents = canvasDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'canvas', 
      TickTemplateCanvasNode.defaultProps, 
      TickTemplateCanvasNode.defaultEvents
    );

    this.setAttribute('template', MiniProgramTemplateID.CANVAS)
  }
}
