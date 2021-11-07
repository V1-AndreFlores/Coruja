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

function Routes() {
  return (
    <NavigationContainer independent>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => (
  <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>
        <Image source={logo} style={{ width: 77, height: 100 }} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
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
      name="HomeDrawer"
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

export default Routes;
