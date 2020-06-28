import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Button from 'react-native-button';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import ajax from '../../services/Routes';

const NewAppointmentSuccess = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    console.log('New Appointment Success');
    async function retrieveUser() {}
    retrieveUser();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Presentation}>
        <View style={styles.Description}>
          <Image
            style={{ width: 120, height: 120, marginTop: 50 }}
            source={require('../../../assets/icons/icon-calendarSuccess.png')}
          />
          <Text style={styles.Title}>Felicitaciones</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.Text}>
              Su cita ha sido reservada satisfactoriamente.
            </Text>
          </View>
        </View>
        <View style={styles.Buttons}>
          <Button
            style={styles.Button}
            onPress={() => props.navigation.navigate('MyAppointmentsFlow')}
          >
            Ver cita
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Presentation: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F6F7FA',
    alignItems: 'center',
  },
  Description: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  Title: {
    color: '#414968',
    fontSize: 25,
    marginTop: 50,
    fontFamily: 'Montserrat-ExtraBold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  Buttons: {
    flex: 0.5,
    marginHorizontal: 25,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  Button: {
    backgroundColor: '#639BEF',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 15,
    height: 50,
    width: 360,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  Text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#414968',
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default NewAppointmentSuccess;
