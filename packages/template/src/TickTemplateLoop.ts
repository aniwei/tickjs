import {
  TickTemplateBlockElement,
} from './TickTemplateBlockElement'
import {
  TickTemplateElement
} from './TickTemplateElement';
import { brackets, Children, Key } from './TickTemplateDataStruct'

class TickTemplateLoop {
  public blockElement: TickTemplateBlockElement;

  constructor () {
    this.blockElement = new TickTemplateBlockElement();

    this.blockElement.setAttribute(
      'wx:for',
      brackets(Children), // e[0]
    );

    this.blockElement.setAttribute(
      'wx:key',
      Key
    );
  }

  stringify () {

    return `<block wx:for="{{}}">`
  }
}

`
<block wx:for="{{e[0]}}" wx:key="{{}}">
`