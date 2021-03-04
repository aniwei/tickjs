import { Component, useEffect, useState } from 'react';
import { Image } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { UINavigationController } from '../UINavigationController';
import { 
  getNavigationControllerId,
  getApplicationPages, 
  getBottomTarBar,
} from './shared';

const BottomNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();

export function AppStack ({ pages, initialRouteName, onCreated }) { 
  const getNavigaionController = (id, controller) => {
    onCreated(id, controller);
  }

  return (
    <StackNavigator.Navigator
      initialRouteName={initialRouteName}
    >
      {
        pages.map(route => {
          return (
            <StackNavigator.Screen 
              key={route}
              name={route}
              component={class extends Component {
                controllerId = getNavigationControllerId();

                getNavigaionController = (ref) => {
                  getNavigaionController(this.controllerId, ref);
                }

                render () {
                  return <UINavigationController 
                    {...this.props} 
                    route={route} 
                    ref={this.getNavigaionController}
                    controllerId={this.controllerId}
                  />
                }
              }}
              options={{
                animationEnabled: true,
              }}
            />
          );
        })
      }
    </StackNavigator.Navigator>
  )
}

export function AppNavigator (props) {
  const { __TICK_MINI_PROGRAM } = props;
  const { config } = __TICK_MINI_PROGRAM;
  const [pages, setPages] = useState(getApplicationPages(config));
  const [tabBar, setTabBar] = useState(getBottomTarBar(config));

  useEffect(() => {
    const { config } = __TICK_MINI_PROGRAM;
    
    setPages(getApplicationPages(config));
    setTabBar(getBottomTarBar(config));

  }, [__TICK_MINI_PROGRAM]);

  // useMessage('webview.created', () => {
  //   const { onLoad } = props;

  //   onLoad();
  // })

  return (
    <NavigationContainer>
      <BottomNavigator.Navigator
        initialRouteName="Home"
        tabBarOptions={tabBar}
      >
        {
          tabBar.tabItems.map(tabItem => {
            return <BottomNavigator.Screen 
              key={tabItem.path}
              name={tabItem.path}
              component={(props) => {
                return <AppStack 
                  {...props} 
                  pages={pages} 
                />
              }}
              options={{
                tabBarLabel: tabItem.label,
                
                tabBarIcon: (option) => {
                  const icon = option.focused ? 
                    tabItem.selectedIcon : tabItem.icon;

                  return <Image 
                    style={{ width: 24, height: 24 }}
                    source={'data:image/png;base64,' + icon} 
                  />
                },
              }}
            />
          })
        }
      </BottomNavigator.Navigator>
    </NavigationContainer>
  );
}
