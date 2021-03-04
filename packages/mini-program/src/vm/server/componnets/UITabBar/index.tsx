import { useState } from 'react';
import { Image } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UINavigationController } from '../UINavigationController';


const BottomTabNavigator = createBottomTabNavigator();
const { Navigator, Screen } = BottomTabNavigator;


export function UITabBar ({ __TICK_MINI_PROGRAM }) {
  const { tabBar } = __TICK_MINI_PROGRAM.config;
  const [tabbar] = useState({
    activeTintColor: tabBar.selectedColor,
    inactiveTintColor: tabBar.color,
    backgroundColor: tabBar.backgroundColor,
    tabItems: tabBar.list.map(tabItem => {
      return {
        label: tabItem.text,
        path: tabItem.pagePath,
        icon: tabItem.iconData,
        selectedIcon: tabItem.selectedIconData
      }
    })
  });

  const { tabItems } = tabbar;

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        {
          tabItems.map(tabItem => {
            return <Screen 
              key={tabItem.path}
              name={tabItem.path}
              component={UINavigationController}
              options={{
                tabBarLabel: tabItem.label,
                tabBarIcon: ({ color, size }) => {
                  return <Image 
                    style={{ width: 24, height: 24 }}
                    source={'data:image/png;base64,' + tabItem.icon} 
                  />
                },
              }}
            />
          })
        }
      </Navigator>
    </NavigationContainer>
  );
}
