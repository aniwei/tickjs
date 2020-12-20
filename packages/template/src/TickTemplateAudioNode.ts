import {
  TickTemplateClosingComponent,
} from './TickTemplateComponent';

import {
  variable
} from './shared'

export enum DataStruct {
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
    super('audio');

    for (
      const [
        keyName, 
        valueName, 
        defaultValue
      ] of TickTemplateAudioNode.defaultProps
    ) {
      this.setAttribute(keyName, valueName, defaultValue);
    }

    for (
      const [
        eventName, 
        listenerName, 
        capture
      ] of TickTemplateAudioNode.defaultEvents
    ) {
      this.addEventListener(eventName, listenerName, capture);
    }
  }
}