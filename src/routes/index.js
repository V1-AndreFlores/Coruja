import React from 'react';
import { View, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import logo from '../assets/logo.png';
import StackRoutesMovies from './stackRoutesMovies';
import StackRoutesSeries from './stackRoutesSeries';
import StackRoutesFavorites from './stackRoutesFavorites';
import About from '../pages/About';
import FavoritesTotal from '../components/FavoritesTotal';
import Version from '../components/Version';

function Routes() {
  const Drawer = createDrawerNavigator();

  const CustomDrawer = (props) => (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Image source={logo} style={{ width: 100, height: 153 }} />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <FavoritesTotal />
      <Version />
    </View>
  );

  const DrawerNavigator = () => (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1e1e1e',
          paddingTop: 20,
        },
        drawerActiveBackgroundColor: '#ed3237',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="StackRoutesMovies"
        component={StackRoutesMovies}
        options={{
          title: 'Filmes',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'movie-open' : 'movie-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="StackRoutesSeries"
        component={StackRoutesSeries}
        options={{
          title: 'Séries',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'animation-play' : 'animation-play-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="StackRoutesFavorites"
        component={StackRoutesFavorites}
        options={{
          title: 'Favoritos',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'heart-multiple' : 'heart-multiple-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          title: 'Sobre',
          drawerIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name={focused ? 'comment-question' : 'comment-question-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer independent>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default Routes;
