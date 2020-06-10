import React, { useEffect } from "react";
import Specialties from "./Specialties";
import Specialty from "./Specialty";
import Doctor from "./Doctor";
import NewAppointment from "./NewAppointment";
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
      <Stack.Screen
        name="Specialty"
        component={Specialty}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Doctor"
        component={Doctor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewAppointment"
        component={NewAppointment}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SpecialtyFlow;
