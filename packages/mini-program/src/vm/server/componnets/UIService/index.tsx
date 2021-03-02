import { Component } from 'react';
import { useScript } from '../../hooks/useScript';
import { useMessage } from '../../hooks/useMessage';


export function Service (props) {
  useScript(`/ServiceWeixinJSCore.js`);
  useScript(`/uiservice`);
  useScript(() => {
    const { onLoad } = props;
    onLoad();
  });

  const subscribeMethod = (...args) => {
    const { subscribeHandler } = props;
    subscribeHandler(...args);
  }

  useMessage(`webview.custom_event_GenerateFuncReady`, subscribeMethod);
  useMessage(`webview.custom_event_PAGE_EVENT`, subscribeMethod);
  useMessage(`webview.custom_event_initReady_getPerformance`, subscribeMethod);
  useMessage(`webview.custom_event_vdSync`, subscribeMethod);
  useMessage(`webview.custom_event_tapAnyWhere`, subscribeMethod);
  
  return null;
}

export interface IProps {
  onLoad: Function | null;
}

export class UIService extends Component<IProps, {}> {
  static defaultProps = {
    onLoad () {}
  }

  subscribeHandler = (...args) => {
    WeixinJSBridge.invokeCallbackHandler(...args);
  }

  invokeCallbackHandler = (...args) => {
    WeixinJSBridge.invokeCallbackHandler(...args);
  }

  onLoad = () => {
    const { onLoad } = this.props;
    onLoad();
  }

  render () {
    return <Service 
      onLoad={this.onLoad}
      subscribeHandler={this.subscribeHandler} 
    />
  }
}