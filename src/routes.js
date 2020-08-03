import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Start from './Pages/Start';
import Home from './Pages/Home';
import AddPost from './Pages/AddPost';
import Chats from './Pages/Chats';
import Chat from './Pages/Chat';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'
      >
        {/*<Stack.Screen name='Start' component={Start} />*/}
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddPost' component={AddPost} />
        <Stack.Screen name='Chats' component={Chats} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
