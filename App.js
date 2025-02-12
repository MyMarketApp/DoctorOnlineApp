import React, { useEffect } from "react";
import Presentation from "./src/screens/Presentation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Welcome from "./src/screens/Welcome";
import LoginProfile from "./src/screens/LoginProfile";
import Main from "./src/screens/Main";
import UserRegistration from "./src/screens/UserRegistration";
import PatientProfile from "./src/screens/PatientProfile";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Presentation"
          component={Presentation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginProfile"
          component={LoginProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserRegistration"
          component={UserRegistration}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PatientProfile"
          component={PatientProfile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
