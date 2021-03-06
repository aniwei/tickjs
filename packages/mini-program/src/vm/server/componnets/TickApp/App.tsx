import URL from 'url-parse';
import qs from 'qs';
import { Component } from 'react';
import { View, Dimensions } from 'react-native-web';
import { AppNavigator } from '../AppNavigator';
import { AppService } from '../AppService';

export default class App extends Component {
  state = {
    isAppServiceLoaded: false,
    appservice: null
  }

  isFirstLaunched = true;

  navigator = null;

  onAppServiceLoad = (appservice) => {
    this.setState({
      isAppServiceLoaded: true,
      appservice
    });
  }

  onNavigate = ({ url }) => {
    const parsed = new URL(`tickjs://tickjs.io/${url}`);
    const query = qs.parse(parsed.query.slice(1));
    
    this.navigator.navigation.push(parsed.pathname.slice(1), query);
  }

  onAppNavigatorCreated = (id, navigator, options) => {
    const { appservice } = this.state;

    if (this.isFirstLaunched) {
      this.isFirstLaunched = false;
      options = {
        ...options,
        ...__TICK_MINI_PROGRAM.config.appLaunchInfo
      }
    }

    this.navigator = navigator;

    appservice.subscribeHandler('onAppRoute', options, id);
  }

  onAppNavigatorFocus = (id, navigator) => {
    this.navigator = navigator;
  }

  render () {
    const { isAppServiceLoaded } = this.state;

    return (
      <View style={{ height: Dimensions.get('window').height }}>
        <AppService 
          onLoad={this.onAppServiceLoad} 
          onNavigate={this.onNavigate}
        />
        { 
          isAppServiceLoaded ? 
            <AppNavigator 
              {...this.props}
              onNavigatorCreated={this.onAppNavigatorCreated}
              onAppNavigatorFocus={this.onAppNavigatorFocus}
            /> : null
        }
      </View>
    ); 
  }
}
