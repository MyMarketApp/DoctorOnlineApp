import React, { Component, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Picker,
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

const Doctor = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });
  const { doctor } = props.route.params;
  const { doctorSpec } = props.route.params;
  const { selectedPrice } = props.route.params;
  const { selectedRate } = props.route.params;
  const { profiles } = props;
  const [schedules, Schedules] = useState([]);
  const [selectedschedule, SelectedSchedule] = useState();
  const [selectedProfile, SelectedProfile] = useState();
  const [showSchedules, ShowSchedules] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  useEffect(() => {
    console.log('Resumen');
    async function retrieveSchedules() {
      const response = await ajax.schedulesDoctor(doctor.id);
      Schedules(response.body);
      ShowSchedules(response.body.filter((s) => s.day == date.getDay()));
    }
    retrieveSchedules();
  }, []);

  useEffect(() => {
    async function updateSchedules() {
      ShowSchedules(schedules.filter((s) => s.day == date.getDay()));
    }
    updateSchedules();
  }, [date]);

  const createAppointment = () => {
    if (!selectedProfile || !selectedschedule) alert('Completar datos');
    else
      props.navigation.navigate('NewAppointment', {
        doctor,
        date,
        schedule: selectedschedule,
        patient: selectedProfile,
        selectedPrice,
        selectedRate,
        doctorSpec,
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

  let ScheduleHours = showSchedules.map((item, index) => {
    return (
      <Picker.Item
        label={item.start.substring(0, 5) + ' - ' + item.end.substring(0, 5)}
        value={item}
        key={item.id}
      />
    );
  });

  let ShowProfiles = profiles.map((item, index) => {
    return (
      <View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
          key={item.id}
        >
          <TouchableOpacity onPress={() => SelectedProfile(item)}>
            <Image
              style={
                selectedProfile && selectedProfile.id == item.id
                  ? styles.ImageSelected
                  : styles.Image
              }
              source={{ uri: item.imageUrl }}
            />
            <Text
              style={
                selectedProfile && selectedProfile.id == item.id
                  ? styles.ProfileNameSelected
                  : styles.ProfileName
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#F6F7FA' }}>
        <View style={styles.header}>
          <Text style={styles.headTitle}>Reservar cita</Text>
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

        <View style={styles.section}>
          <Text style={styles.secTitle}>Seleccione Fecha</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 10,
              justifyContent: 'space-between',
              marginTop: 25,
              height: 50,
            }}
          >
            <Text
              onPress={() => setShow(true)}
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                color: '#2F2929',
                paddingLeft: 30,
                alignContent: 'center',
                textAlignVertical: 'center',
              }}
            >
              {date.getFullYear() +
                '-' +
                (date.getMonth() < 10
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1) +
                '-' +
                (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())}
            </Text>
            <View style={{ alignContent: 'center', marginRight: 10 }}>
              <Icon
                name="ios-calendar"
                type="ionicon"
                color="#828282"
                size={24}
                onPress={() => setShow(true)}
              />
            </View>
          </View>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.secSched}>
          <Text style={styles.secTitle}>
            Horarios Disponibles
            <Text style={styles.secSubtitle}> ({showSchedules.length})</Text>
          </Text>
          {showSchedules.length === 0 ? (
            <View></View>
          ) : (
            <View
              style={{
                height: 50,
                borderRadius: 15,
                borderWidth: 0,
                backgroundColor: 'white',
                overflow: 'hidden',
                paddingLeft: 20,
                marginTop: 25,
              }}
            >
              <Picker
                style={{
                  paddingLeft: 25,
                  backgroundColor: 'white',
                }}
                selectedValue={selectedschedule}
                onValueChange={(selectedschedule) =>
                  SelectedSchedule(selectedschedule)
                }
              >
                {ScheduleHours}
              </Picker>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.secTitle}>Seleccione Perfil</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: 25,
            }}
          >
            {ShowProfiles}
          </View>
        </View>

        <View style={styles.section}>
          <Button style={styles.Button2} onPress={createAppointment}>
            Continuar
          </Button>
        </View>
      </ScrollView>
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
  secSched: {
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
  secSubtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#828282',
  },
  schedBox: {
    backgroundColor: '#EAECF4',
    height: 50,
    borderRadius: 15,
    padding: 20,
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 5,
  },
  schedBoxSelected: {
    backgroundColor: '#639BEF',
    height: 50,
    borderRadius: 15,
    padding: 20,
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 5,
  },
  schedTxt: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#2F2929',
  },
  schedTxtSelected: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: 'white',
  },
  Button: {
    backgroundColor: '#639BEF',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 15,
    height: 50,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  ButtonSelected: {
    backgroundColor: 'green',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 15,
    height: 50,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  Image: {
    width: 60,
    height: 60,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 30,
  },
  ImageSelected: {
    width: 60,
    height: 60,
    borderColor: '#639BEF',
    borderWidth: 2,
    borderRadius: 30,
    opacity: 0.3,
  },
  Button2: {
    backgroundColor: '#639BEF',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 15,
    height: 50,
    width: 360,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  ProfileName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    color: '#2F2929',
  },
  ProfileNameSelected: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    color: '#639BEF',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
