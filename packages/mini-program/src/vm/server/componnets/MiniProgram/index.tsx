import { Component } from 'react';
import { UIService } from '../UIService';
import { useMessage } from '../../hooks/useMessage';


export function UsingMessage (props) {
  const { invokeHandler } = props;
  useMessage('service.getSystemInfo', invokeHandler)

  return null;
}

export class MiniProgram extends Component {
  public service;

  invokeHandler = (event) => {
    const { callbackId } = event.detail;

    this.service.invokeCallbackHandler(callbackId, {
      errMsg: 'getSystemInfo:ok',
      ...$$miniProgram.system,
    });
  }

  render () {
    return (
      <div>
        <UsingMessage 
          invokeHandler={this.invokeHandler} 
        />
        <UIService 
          ref={ref => this.service = ref} 
        />
      </div>
    );
  }
}