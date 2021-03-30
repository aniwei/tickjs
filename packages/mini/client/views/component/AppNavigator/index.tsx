import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// @ts-ignore
import { Image } from 'react-native-web';

import { AppContext } from '../TickApp/AppContext'
import { UINavigationController } from '../UINavigationController';
import { TabBarItem } from '@hooks/useConfig';

const BottomNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();


export function AppTabBar () {
  const { config } = useContext(AppContext);
  const {
    bottomTabBar, 
    launchOptions
  } = config;
  
  return (
    <BottomNavigator.Navigator
      initialRouteName={launchOptions.path + '.html'}
      tabBarOptions={bottomTabBar}
    >
      {
        bottomTabBar.tabItems.map((tabItem: TabBarItem) => {
          return <BottomNavigator.Screen 
            key={tabItem.path}
            name={tabItem.path}
            component={UINavigationController}
            
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
  )
}

export function AppNavigator () {
  const { config } = useContext(AppContext);
  const {
    pages,
    bottomTabBar,
    launchOptions
  } = config;

  const tabItems = bottomTabBar.tabItems.map((tabItem: TabBarItem) => tabItem.path);
  const screens = pages.filter((page: any) => {
    return !tabItems.includes(page.route);
  });

  return (
    <NavigationContainer>
      <StackNavigator.Navigator>
        <StackNavigator.Screen 
          name={launchOptions.path + '.html'}
          component={AppTabBar}
          options={{
            headerShown: false
          }}
        />  

        {
          screens.map((page) => {
            const { route, config: { window }} = page;

            return (
              <StackNavigator.Screen 
                key={route}
                name={route}
                component={UINavigationController}
                options={{
                  animationEnabled: true,
                  headerTitle: window.navigationBarTitleText || '',
                  headerTransparent: window.navigationStyle === 'custom',
                  headerShown: window.navigationStyle !== 'custom'
                }}
              />
            );
          })
        }
        
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
