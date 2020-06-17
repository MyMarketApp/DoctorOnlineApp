import React, { useEffect } from 'react';
import Specialties from './Specialties';
import Specialty from './Specialty';
import DoctorDetail from './DoctorDetail';
import DoctorCreateAppo from './DoctorCreateAppo';
import NewAppointment from './NewAppointment';
import NewAppointmentSuccess from './NewAppointmentSuccess';
import Home from './Home';
import PurchaseProduct from '../Purchase/PurchaseProduct';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const SpecialtyFlow = (props) => {
  useEffect(() => {}, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
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
        name="DoctorDetail"
        component={DoctorDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DoctorCreateAppo"
        component={DoctorCreateAppo}
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
      <Stack.Screen
        name="PurchaseProduct"
        component={PurchaseProduct}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewAppointmentSuccess"
        component={NewAppointmentSuccess}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SpecialtyFlow;
