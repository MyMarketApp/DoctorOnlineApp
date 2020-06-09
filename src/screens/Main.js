import React, { useEffect } from "react";
import { Image } from "react-native";
import MainSidebar from "../components/MainSidebar";
import ContactUs from "./ContactUs";

import SpecialtyFlow from "./SpecialtyFlow/SpecialtyFlow";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ProfilesFlow from "./ProfileFlow/ProfilesFlow";

const Drawer = createDrawerNavigator();

const Main = (props) => {
  const { user } = props.route.params;
  const initialState = {
    user: user,
    profiles: user.profiles,
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
        <Drawer.Navigator
          initialRouteName="ContactUs"
          drawerContent={(props) => <MainSidebar {...props} />}
          drawerStyle={
            {
              // backgroundColor: "blue",
            }
          }
        >
          <Drawer.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              title: "Contactanos",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/ContactUs.png")}
                  style={{ width: 20, height: 20 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ProfilesFlow"
            component={ProfilesFlow}
            options={{
              title: "Perfiles",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/Profile.png")}
                  style={{ width: 20, height: 20 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="SpecialtyFlow"
            component={SpecialtyFlow}
            options={{
              title: "Especialidades",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/icons/Profile.png")}
                  style={{ width: 20, height: 20 }}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Main;
