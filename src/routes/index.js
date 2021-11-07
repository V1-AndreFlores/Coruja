import React from 'react';
import { View, Image, Text } from 'react-native';
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
      <View
        style={{
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Image source={logo} style={{ width: 80, height: 119 }} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    <View
      style={{
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#151515',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        Favoritados
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              justifyContent: 'flex-start',
              fontSize: 20,
            }}
          >
            0
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              justifyContent: 'flex-end',
              fontSize: 20,
            }}
          >
            0
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              justifyContent: 'flex-start',
            }}
          >
            Filmes
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: '#fff',
              justifyContent: 'flex-end',
            }}
          >
            Séries
          </Text>
        </View>
      </View>
    </View>
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
