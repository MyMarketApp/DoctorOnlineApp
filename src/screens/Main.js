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
// const thunkMiddleware = require('redux-thunk').default
import thunkMiddleware from 'redux-thunk'

const URI = 'https://genkisalud.azurewebsites.net';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Main = (props) => {
  const { user } = props.route.params;
  const initialState = {
    user: user,
    profiles: user.profiles,
    appointments: [],
    specialties: [],
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SetUser':
        return {
          ...state,
          user: action.user,
        };
      case 'UpdatePatient':
        return {
          ...state,
          profiles: state.profiles.map((profile) => {
            if (profile.id == action.patient.id) return action.patient;
            return profile;
          }),
        };
      case 'AddPatient':
        return {
          ...state,
          profiles: [...state.profiles, action.patient],
        };
      case 'SetAppointments':
        return {
          ...state,
          appointments: action.appointments,
        };
      case 'AddAppointment':
        return {
          ...state,
          appointments: [...state.appointments, action.appointment],
        };
      case 'SetSpecialties':
        return {
          ...state,
          specialties: action.specialties,
        };
    }
    return state;
  };

  const fetchSpecialties = () => {
    return function(dispatch) {
      axios.get(URI + '/api/Specialty/all')
      .then(response => {
          dispatch({ type: "SetSpecialties", specialties:response.data.body })
      })
    }
}

  const store = createStore(reducer,applyMiddleware(thunkMiddleware));
  store.dispatch(fetchSpecialties()) 
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
