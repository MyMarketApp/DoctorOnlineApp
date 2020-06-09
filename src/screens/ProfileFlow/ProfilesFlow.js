import React, { useEffect } from "react";
import Profiles from "./Profiles";
import PatientProfileUpdate from "./PatientProfileUpdate";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const ProfileFlow = (props) => {
  useEffect(() => {}, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profiles"
        component={Profiles}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PatientProfileUpdate"
        component={PatientProfileUpdate}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileFlow;
