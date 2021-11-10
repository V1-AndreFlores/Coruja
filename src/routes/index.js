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
import Series from '../pages/Series';
import Favorites from '../pages/Favorites';
import About from '../pages/About';
import StackRoutes from './stackRoutes';
import FavoritesTotal from '../components/FavoritesTotal';

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
        name="StackRoutes"
        component={StackRoutes}
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
        name="Series"
        component={Series}
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
        name="Favorites"
        component={Favorites}
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
