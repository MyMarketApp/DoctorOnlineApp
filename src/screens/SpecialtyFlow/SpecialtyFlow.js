import React, { useEffect } from "react";
import Specialties from "./Specialties";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const SpecialtyFlow = (props) => {
  useEffect(() => {}, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Specialties"
        component={Specialties}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SpecialtyFlow;
