import { Component, useRef, useEffect, useState, useMemo } from 'react';
import { Image, View, Text } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { UINavigationController } from '../UINavigationController';
import { AppCapsule } from '../AppCapsule';
import { useSubscribe } from '../../hooks/useSubscribe';
import { useMessage } from '../../hooks/useMessage';
import { 
  getApplicationLaunchOptions,
  getNavigationControllerId,
  getApplicationPages, 
  getBottomTarBar,
} from './shared';


const BottomNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();


export function AppStack ({ pages, initialRouteName, onNavigatorCreated, onAppNavigatorFocus }) { 
  
  
  return (
    <StackNavigator.Navigator
      initialRouteName={initialRouteName}
    >
      {
        pages.map((page) => {
          const { route, config } = page;

          return (
            <StackNavigator.Screen 
              key={page.route}
              name={page.route}

              component={(props) => {
                const controllerId = useMemo(() => getNavigationControllerId(), []);

                useEffect(() => {
                  return () => {
                    debugger;
                  }
                }, []);
                
                return <UINavigationController 
                  {...props}
                  path={page.route}
                  onCreated={onNavigatorCreated}
                  onFocus={onAppNavigatorFocus}
                  controllerId={controllerId}
                />
              }}
              options={{
                animationEnabled: true,
                headerTitle: config.window.navigationBarTitleText || '',
                // headerBackground: config.window.navigationBarBackgroundColor,
                headerTransparent: true,
                headerRight: () => {
                  return <AppCapsule />
                }
              }}
            />
          );
        })
      }
    </StackNavigator.Navigator>
  )
}

export function AppNavigator (props) {
  const { __TICK_MINI_PROGRAM, onNavigatorCreated, onAppNavigatorFocus } = props;
  const { config } = __TICK_MINI_PROGRAM;
  const [pages, setPages] = useState(getApplicationPages(config));
  const [tabBar, setTabBar] = useState(getBottomTarBar(config));
  const [launchOptions, setLaunchOptions] = useState(getApplicationLaunchOptions(config))
  const controllers = useMemo(() => {
    return new Map();
  }, []);

  useSubscribe([
    `service.custom_event_onAppRoute`,
    `service.custom_event_invokeWebviewMethod`,
    `service.custom_event_checkWebviewAlive`,
    `service.custom_event_vdSync`,
    `service.custom_event_vdSyncBatch`,
  ], (name, data, id, options, controllerId) => {
    const controller = controllers.get(controllerId);

    if (controller) {
      controller.subscribeHandler(name, data, id, options);
    }
  });

  return (
    <NavigationContainer>
      <BottomNavigator.Navigator
        initialRouteName={launchOptions.path + '.html'}
        tabBarOptions={tabBar}
      >
        {
          tabBar.tabItems.map((tabItem, index) => {
            return <BottomNavigator.Screen 
              key={tabItem.route}
              name={tabItem.route}
              component={(props) => {
                return <AppStack 
                  {...props} 
                  initialRouteName={tabItem.route}
                  onNavigatorCreated={(id, navigator, options) => {
                    if (navigator) {
                      controllers.set(id, navigator);
                    }
                    
                    onNavigatorCreated(id, navigator, options);
                  }}
                  onAppNavigatorFocus={onAppNavigatorFocus}
                  onNavigatorDistroy={(id) => controllers.delete(id)}
                  pages={pages} 
                />
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (event) => {
                  // event.preventDefault();

                  // navigation.navigate(route.name, {
                  //   __TYPE: 'switchTab',
                  //   __TRIGGER_FROM: {
                  //     index,
                  //     ...tabItem,
                  //   }
                  // });
                },
              })}
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
