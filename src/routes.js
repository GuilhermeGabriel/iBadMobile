import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Start from './Pages/Start';
import Home from './Pages/Home';
import AddPost from './Pages/AddPost';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'
      >
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddPost' component={AddPost} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
