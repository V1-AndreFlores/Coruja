import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Movies from '../pages/Movies';
import Detail from '../pages/Detail';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          title: 'Detalhes',
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Sua Busca',
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#151515',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
