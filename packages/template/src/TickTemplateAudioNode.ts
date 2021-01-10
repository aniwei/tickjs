import {
  audioDefaultProps,
  audioDefaultEvents,
  MiniProgramTemplateID,
} from '@tickjs/struct'
import {
  TickTemplateClosingComponent,
} from './TickTemplateComponent';

import {
  transformDefaultEvent,
  transformDefaultProps
} from './shared'

export function createAudio () {
  const audio = new TickTemplateAudioNode();

  return audio;
}

export class TickTemplateAudioNode extends TickTemplateClosingComponent {
  static defaultProps = audioDefaultProps.map(transformDefaultProps)
  static defaultEvents = audioDefaultEvents.map(transformDefaultEvent)

  constructor () {
    super(
      'audio', 
      TickTemplateAudioNode.defaultProps, 
      TickTemplateAudioNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.AUDIO);
  }
}