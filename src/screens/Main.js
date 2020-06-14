import React, { useEffect } from "react";
import { Image } from "react-native";
import MainSidebar from "../components/MainSidebar";
import ContactUs from "./ContactUs";

import SpecialtyFlow from "./SpecialtyFlow/SpecialtyFlow";
import MyAppointmentsFlow from "./MyAppointmentsFlow/MyAppointmentsFlow";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ProfilesFlow from "./ProfileFlow/ProfilesFlow";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Main = (props) => {
  const { user } = props.route.params;
  const initialState = {
    user: user,
    profiles: user.profiles,
    appointments: null,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SetUser":
        return {
          ...state,
          user: action.user,
        };
      case "UpdatePatient":
        return {
          ...state,
          profiles: state.profiles.map((profile) => {
            if (profile.id == action.patient.id) return action.patient;
            return profile;
          }),
        };
      case "AddPatient":
        return {
          ...state,
          profiles: [...state.profiles, action.patient],
        };
      case "SetAppointments":
        return {
          ...state,
          appointments: action.appointments,
        };
    }
    return state;
  };

  const store = createStore(reducer);

  useEffect(() => {
    // console.log(user);
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName="SpecialtyFlow"
          TabContent={(props) => <MainSidebar {...props} />}
        >
          <Tab.Screen
            name="SpecialtyFlow"
            component={SpecialtyFlow}
            options={{
              title: "Especialidades",
              tabBarIcon: () => (
                <Image
                  source={require("../../assets/icons/home.png")}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              title: "Inicio",
              tabBarIcon: () => (
                <Image
                  source={require("../../assets/icons/home.png")}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProfilesFlow"
            component={ProfilesFlow}
            options={{
              title: "Perfiles",
              tabBarIcon: () => (
                <Image
                  source={require("../../assets/icons/User.png")}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MyAppointmentsFlow"
            component={MyAppointmentsFlow}
            options={{
              title: "Mis citas",
              tabBarIcon: () => (
                <Image
                  source={require("../../assets/icons/User.png")}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Main;
