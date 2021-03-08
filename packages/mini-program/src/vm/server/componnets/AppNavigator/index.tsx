import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native-web';

import { AppContext } from '../TickApp/AppContext'
import { useAppNavigatorSubscribe } from '../../hooks/useAppNavigatorSubscribe';
import { UINavigationController } from '../UINavigationController';
import { Component } from 'react';


const BottomNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();


export function AppStack ({ pages, initialRouteName }) { 
  return (
    <StackNavigator.Navigator 
      initialRouteName={initialRouteName}
    >
      {
        pages.map((page) => {
          const { route, config:  {window } } = page;
          return (
            <StackNavigator.Screen 
              key={route}
              name={route}
              component={UINavigationController}
              options={{
                animationEnabled: true,
                headerTitle: window.navigationBarTitleText || '',
                headerTransparent: true,
              }}
            />
          );
        })
      }
    </StackNavigator.Navigator>
  )
}

export function AppNavigator (props) {
  const { 
    appconfig: {
      pages, 
      bottomTabBar, 
      launchOptions 
    }
  } = useContext(AppContext);
  
  useAppNavigatorSubscribe();

  return (
    <NavigationContainer>
      <BottomNavigator.Navigator
        initialRouteName={launchOptions.path + '.html'}
        tabBarOptions={bottomTabBar}
      >
        {
          bottomTabBar.tabItems.map((tabItem, index) => {
            return <BottomNavigator.Screen 
              key={tabItem.route}
              name={tabItem.route}
              component={(props) => {
                return <AppStack 
                  {...props} 
                  initialRouteName={tabItem.route}
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
