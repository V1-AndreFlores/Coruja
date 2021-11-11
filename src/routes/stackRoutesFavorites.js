import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Favorites from '../pages/Favorites';
import Detail from '../pages/Detail';

const Stack = createNativeStackNavigator();

function StackRoutesFavorites() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
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
    </Stack.Navigator>
  );
}

export default StackRoutesFavorites;
