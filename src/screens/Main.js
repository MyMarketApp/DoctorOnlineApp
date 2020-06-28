import React, { useEffect } from "react";
import { Image } from "react-native";
import MainSidebar from "../components/MainSidebar";
import ContactUs from "./ContactUs";
import axios from "axios";
import SpecialtyFlow from "./SpecialtyFlow/SpecialtyFlow";
import MyAppointmentsFlow from "./MyAppointmentsFlow/MyAppointmentsFlow";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProfilesFlow from "./ProfileFlow/ProfilesFlow";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import thunkMiddleware from "redux-thunk";
import { initialState, reducer } from "../components/AsyncActions";
import ajax from "../services/Routes";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Main = (props) => {
  const { user } = props.route.params;

  const initData = () => {
    return function (dispatch) {
      dispatch({ type: "SetUser", user });
      ajax.Specialties().then((response) => {
        dispatch({ type: "SetSpecialties", specialties: response.body });
      });
      ajax.Appointments().then((response) => {
        dispatch({ type: "SetAppointments", appointments: response.body });
      });
      ajax.Profiles(user.id).then((response) => {
        dispatch({ type: "SetProfiles", profiles: response.body });
      });
    };
  };

  const store = createStore(reducer, applyMiddleware(thunkMiddleware));
  store.dispatch(initData());

  useEffect(() => {
    console.log("Main");
    async function getExpoPushToken() {
      const expoPushToken = await getPushNotificationPermissions();
      console.log(expoPushToken);
      if (!user.expoPushToken || user.expoPushToken != expoPushToken) {
        const response = await ajax.updateUserExpoPushToken(
          user.email,
          expoPushToken
        );
        console.log("falta update de state user");
      }
    }
    getExpoPushToken();
  }, []);

  getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return null;
    }
    // console.log(finalStatus);
    // console.log(
    //   "Notification Token: ",
    //   await Notifications.getExpoPushTokenAsync()
    // );
    return await Notifications.getExpoPushTokenAsync();
    // Get the token that uniquely identifies this device
  };

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
            name="ContactUs"
            component={ContactUs}
            options={{
              title: "change",
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
