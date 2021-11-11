import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Series from '../pages/Series';
import Detail from '../pages/Detail';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();

function StackRoutesSeries() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Series"
        component={Series}
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

export default StackRoutesSeries;
