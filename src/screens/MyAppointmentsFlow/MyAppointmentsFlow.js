import React, { useEffect } from "react";
import History from "./History";
import Appointments from "./Appointments";
import AppointmentDetail from "./AppointmentDetail";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";
import ajax from "../../services/Routes";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const HistoryFlow = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppointmentsFlow = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Appointments"
        component={Appointments}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MyAppointmentsFlow = (props) => {
  useEffect(() => {
    console.log("MyAppointmentsFlow");
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="HistoryFlow"
        component={HistoryFlow}
        options={{ tabBarLabel: "Historial de Citas" }}
      />
      <Tab.Screen
        name="AppointmentsFlow"
        component={AppointmentsFlow}
        options={{ tabBarLabel: "Citas Programadas" }}
      />
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointmentsFlow);
