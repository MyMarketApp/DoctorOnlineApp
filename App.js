import React, { useEffect } from 'react';
import Presentation from './src/screens/Presentation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import LoginProfile from './src/screens/LoginProfile';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Presentation" //splash screen of app
          component={Presentation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login" // Login 
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome" //screen after succesfull login
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginProfile" // profile of user after login
          component={LoginProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
