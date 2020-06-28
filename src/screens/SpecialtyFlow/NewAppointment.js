import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Button from 'react-native-button';
import ajax from '../../services/Routes';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../components/Redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { Icon } from 'react-native-elements';

const NewAppointment = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });
  const { date } = props.route.params;
  const { doctor } = props.route.params;
  const { doctorSpec } = props.route.params;
  const { patient } = props.route.params;
  const { schedule } = props.route.params;
  const { selectedPrice } = props.route.params;
  const { selectedRate } = props.route.params;
  useEffect(() => {
    console.log('New Appointment');
  }, []);

  const createAppointment = async () => {
    const response = await ajax.addAppointment(
      null,
      null,
      null,
      null,
      date,
      doctor.id,
      1,
      patient.id,
      schedule.id,
      selectedRate
    );
    props.addAppointment(response.body);
    props.navigation.navigate('PurchaseProduct', {
      appointment: response.body,
      selectedPrice,
    });
  };

  const RateIcon = () => {
    if (selectedRate === 1) {
      return (
        <Icon name="ios-chatbubbles" type="ionicon" color="#639BEF" size={30} />
      );
    } else if (selectedRate === 2) {
      return <Icon name="ios-call" type="ionicon" color="#639BEF" size={30} />;
    } else {
      return (
        <Icon name="ios-videocam" type="ionicon" color="#639BEF" size={30} />
      );
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F7FA' }}>
        <View style={styles.header}>
          <Text style={styles.headTitle}>Datos de la cita</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.secTitle}>Doctor Seleccionado</Text>
          <View style={styles.topDoc}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}
              >
                <Image
                  style={styles.ImageDoc}
                  source={{ uri: doctor.imageUrl }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  marginHorizontal: 10,
                }}
              >
                <View>
                  <Text style={styles.docNameText}>
                    {doctor.idGender === 1 ? 'Dr.' : 'Dra.'} {doctor.name}{' '}
                    {doctor.lastName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.docSpecText}>{doctorSpec}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 5,
              }}
            >
              <RateIcon />
            </View>
          </View>
        </View>

        <View style={styles.TextRow}>
          <Text style={styles.secTitle}>Fecha: </Text>
          <Text style={styles.Info}>
            {date.getFullYear() +
              '-' +
              (date.getMonth() < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1) +
              '-' +
              (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())}
          </Text>
        </View>
        <View style={styles.TextRow}>
          <Text style={styles.secTitle}>Horario: </Text>
          <Text style={styles.Info}>
            {schedule.start.substring(0, 5)}-{schedule.end.substring(0, 5)}
          </Text>
        </View>
        <View style={styles.TextRow}>
          <Text style={styles.secTitle}>Paciente: </Text>
          <Text style={styles.Info}>{patient.name}</Text>
        </View>

        <View style={styles.secButton}>
          <Button style={styles.Button} onPress={createAppointment}>
            Confirmar
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    marginTop: 58,
    marginHorizontal: 25,
    marginBottom: 30,
  },
  headTitle: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 28,
    color: '#414968',
    marginBottom: 5,
  },
  section: {
    marginHorizontal: 25,
    justifyContent: 'center',
    marginBottom: 25,
  },
  secTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#414968',
  },
  topDoc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginTop: 25,
  },
  ImageDoc: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  docNameText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#2F2929',
  },
  docSpecText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#4F4F4F',
  },
  Button: {
    backgroundColor: '#639BEF',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 15,
    height: 50,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    marginVertical: 25,
  },
  Info: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#2F2929',
  },
  TextRow: {
    marginHorizontal: 28,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  secButton: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: 'flex-end',
    marginBottom: 25,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);
