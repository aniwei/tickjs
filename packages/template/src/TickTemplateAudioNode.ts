import {
  TickTemplateClosingComponent,
} from './TickTemplateComponent';

import {
  variable
} from './shared'

enum DataStruct {
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

export const AudioDataStruct = DataStruct;

export class TickTemplateAudioNode extends TickTemplateClosingComponent {
  static defaultProps = [
    ['src', variable(DataStruct.SRC), null],
    ['loop', variable(DataStruct.LOOP), false],
    ['controls', variable(DataStruct.CONTROLS), false], 
    ['poster', variable(DataStruct.POSTER), false], 
    ['name', variable(DataStruct.NAME), false], 
    ['author', variable(DataStruct.AUTHOR), false]
  ];

  static defaultEvents = [
    ['touchstart', variable(DataStruct.TOUCHSTART), false],
    ['touchmove', variable(DataStruct.TOUCHMOVE), false],
    ['touchend', variable(DataStruct.TOUCHEND), false], 
    ['touchcancel', variable(DataStruct.TOUCHCANCEL), false], 
    ['touchforcechange', variable(DataStruct.TOUCHFORCECHANGE), false], 
    ['tap', variable(DataStruct.TAP), false], 
    ['longtap', variable(DataStruct.LONGTAP), false],
    ['error', variable(DataStruct.ERROR), false],
    ['play', variable(DataStruct.PLAY), false],
    ['pause', variable(DataStruct.PAUSE), false],
    ['ended', variable(DataStruct.ENDED), false],
    ['timeupdate', variable(DataStruct.TIMEUPDATE), false],
  ];

  constructor () {
    super(
      'audio', 
      TickTemplateAudioNode.defaultProps, 
      TickTemplateAudioNode.defaultEvents
    );
  }
}

export const audio: TickTemplateAudioNode = new TickTemplateAudioNode();