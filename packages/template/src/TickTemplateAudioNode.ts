import {
  TickTemplateClosingComponent,
  MiniProgramTemplateID,
  DataStruct
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum AudioDataStruct {
  SRC = 5,
  LOOP,
  CONTROLS,
  POSTER,
  NAME,
  AUTHOR,
  TOUCHSTART,
  TOUCHMOVE,
  TOUCHEND,
  TOUCHCANCEL,
  TAP,
  LONGTAP,
  LONGPRESS,
  TOUCHFORCECHANGE,
  TRANSITIONSTART,
  TRANSITIONITERATION,
  TRANSITIONEND,
  ERROR,
  PLAY,
  PAUSE,
  TIMEUPDATE,
  ENDED
}

export function createAudio () {
  const audio = new TickTemplateAudioNode();

  return audio;
}

export class TickTemplateAudioNode extends TickTemplateClosingComponent {
  static defaultProps = [
    ['src', variable(AudioDataStruct.SRC), null],
    ['loop', variable(AudioDataStruct.LOOP), false],
    ['controls', variable(AudioDataStruct.CONTROLS), false], 
    ['poster', variable(AudioDataStruct.POSTER), false], 
    ['name', variable(AudioDataStruct.NAME), false], 
    ['author', variable(AudioDataStruct.AUTHOR), false]
  ];

  static defaultEvents = [
    ['touchstart', variable(AudioDataStruct.TOUCHSTART), false],
    ['touchmove', variable(AudioDataStruct.TOUCHMOVE), false],
    ['touchend', variable(AudioDataStruct.TOUCHEND), false], 
    ['touchcancel', variable(AudioDataStruct.TOUCHCANCEL), false], 
    ['touchforcechange', variable(AudioDataStruct.TOUCHFORCECHANGE), false], 
    ['tap', variable(AudioDataStruct.TAP), false], 
    ['longtap', variable(AudioDataStruct.LONGTAP), false],
    ['error', variable(AudioDataStruct.ERROR), false],
    ['play', variable(AudioDataStruct.PLAY), false],
    ['pause', variable(AudioDataStruct.PAUSE), false],
    ['ended', variable(AudioDataStruct.ENDED), false],
    ['timeupdate', variable(AudioDataStruct.TIMEUPDATE), false],
  ];

  constructor () {
    super(
      'audio', 
      TickTemplateAudioNode.defaultProps, 
      TickTemplateAudioNode.defaultEvents
    );

    this.setAttribute('template',MiniProgramTemplateID.AUDIO);
  }
}