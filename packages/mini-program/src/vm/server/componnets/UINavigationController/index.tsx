import { Component } from 'react';
import { View } from 'react-native-web';

export interface IProps {
  route: string,
  controllerId: string
}

export class UINavigationController extends Component <IProps> {
  public iframe: HTMLIFrameElement | null = null;

  getIFrameInstance = (ref) => {
    this.iframe = ref;
  }

  invokeCallbackHandler (...args) {
    const WeixinJSBridge = this.iframe.contentWindow.WeixinJSBridge;

    WeixinJSBridge.invokeCallbackHandler(...args);
  }
  
  subscribeHandler (...args) {
    const WeixinJSBridge = this.iframe.contentWindow.WeixinJSBridge;
    
    WeixinJSBridge.subscribeHandler(...args);
  }

  render () {
    const { route, controllerId } = this.props;

    return (
      <View style={{ flex: 1, display: 'flex' }}>
        <iframe 
          style={{ flex: 1, border: 'none' }}
          ref={this.getIFrameInstance} 
          src={`view?r=${route}&i=${controllerId}`} 
        />
      </View>
    )
  }

}