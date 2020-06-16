import React, { useEffect } from 'react';
import { Image } from 'react-native';
import MainSidebar from '../components/MainSidebar';
import ContactUs from './ContactUs';
import axios from 'axios'
import SpecialtyFlow from './SpecialtyFlow/SpecialtyFlow';
import MyAppointmentsFlow from './MyAppointmentsFlow/MyAppointmentsFlow';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ProfilesFlow from './ProfileFlow/ProfilesFlow';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import thunkMiddleware from 'redux-thunk'
import { initialState, reducer } from "../components/AsyncActions";
import ajax from "../services/Routes";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Main = (props) => {
  const { user } = props.route.params;

  const initData = () => {
    return function(dispatch) {
      dispatch({ type: "SetUser", user })
      ajax.Specialties()
        .then(response => {
            dispatch({ type: "SetSpecialties", specialties:response.body })
        })
      ajax.Profiles(user.id)
        .then(response => {
            dispatch({ type: "SetProfiles", specialties:response.body })
        })
    }
  }

  const store = createStore(reducer,applyMiddleware(thunkMiddleware));
  store.dispatch(initData()) 
  useEffect(() => {
    console.log("Main");
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
              title: 'Inicio',
              tabBarIcon: () => (
                <Image
                  source={require('../../assets/icons/home.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              title: 'change',
              tabBarIcon: () => (
                <Image
                  source={require('../../assets/icons/home.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProfilesFlow"
            component={ProfilesFlow}
            options={{
              title: 'Perfiles',
              tabBarIcon: () => (
                <Image
                  source={require('../../assets/icons/User.png')}
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MyAppointmentsFlow"
            component={MyAppointmentsFlow}
            options={{
              title: 'Mis citas',
              tabBarIcon: () => (
                <Image
                  source={require('../../assets/icons/User.png')}
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
