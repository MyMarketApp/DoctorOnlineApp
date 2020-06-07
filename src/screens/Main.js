import React, { useEffect } from "react";
import { Image } from "react-native";
import MainSidebar from "../components/MainSidebar";
import ContactUs from "./ContactUs";
import Profile from "./Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from "redux";
import { Provider } from "react-redux";

const Drawer = createDrawerNavigator();

const Main = (props) => {
  const { user } = props.route.params;
  const initialState = {
    user: user,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SetUser":
        return {
          ...state,
          user: action.user,
        };
    }
    return state;
  };

  const store = createStore(reducer);

  useEffect(() => {}, []);
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
            name="Profile"
            component={Profile}
            options={{
              title: "Perfil",
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
