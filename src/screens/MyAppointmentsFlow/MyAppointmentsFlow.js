import React, { useEffect } from "react";
import History from "./History";
import Appointments from "./Appointments";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MyAppointmentsFlow = (props) => {
  useEffect(() => {}, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { paddingTop: 15 },
      }}
    >
      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: "Historial de Citas" }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{ tabBarLabel: "Citas Programadas" }}
      />
    </Tab.Navigator>
  );
};

export default MyAppointmentsFlow;
