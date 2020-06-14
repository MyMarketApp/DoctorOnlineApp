import React, { useEffect } from "react";
import History from "./History";
import Appointments from "./Appointments";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";
import ajax from "../../services/Routes";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

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

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointmentsFlow);
