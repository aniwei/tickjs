import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native-web';

import { AppContext } from '../TickApp/AppContext'
import { useAppNavigatorSubscribe } from '../../hooks/useAppNavigatorSubscribe';
import { UINavigationController } from '../UINavigationController';
import { IAppProps } from '../TickApp/App'

const BottomNavigator = createBottomTabNavigator();
const StackNavigator = createStackNavigator();


export function AppTabBar (props: IAppProps) {
  const { 
    config: {
      bottomTabBar, 
      launchConfig
    }
  } = useContext(AppContext);

  return (
    <BottomNavigator.Navigator
      initialRouteName={launchConfig.path + '.html'}
      tabBarOptions={bottomTabBar}
    >
      {
        bottomTabBar.tabItems.map((tabItem) => {
          return <BottomNavigator.Screen 
            key={tabItem.route}
            name={tabItem.route}
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

export function AppNavigator (props: IAppProps) {
  const { 
    config: {
      pages,
      bottomTabBar,
      launchConfig 
    }
  } = useContext(AppContext);

  const tabItems = bottomTabBar.tabItems.map((tabItem: BottomTabBarItem) => tabItem.route);
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
