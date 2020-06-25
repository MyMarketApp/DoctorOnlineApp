import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Picker,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import ajax from '../../services/Routes';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../components/Redux';
import { Icon } from 'react-native-elements';

const PatientProfileUpdate = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  });
  const { patient } = props.route.params;
  const [name, Name] = useState(patient.name);
  const [lastname, Lastname] = useState(patient.lastName);
  const [dni, Dni] = useState(patient.dni);
  const [phone, Phone] = useState(patient.phone);
  const [birthdate, Birthdate] = useState(new Date(patient.birthdate));
  const [gender, Gender] = useState(patient.idGender);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShow(Platform.OS === 'ios');
    Birthdate(currentDate);
  };

  useEffect(() => {
    console.log('Profile Patient 1');
  }, []);

  const updateUser = async () => {
    if (!dni || !name || !lastname) alert('completar datos');
    else {
      let response = await ajax.updatePatient(
        patient.id,
        name,
        lastname,
        gender,
        patient.idUser,
        dni,
        birthdate,
        patient.imageUrl,
        phone
      );
      alert(response.message);
      if (response.status) props.updatePatient(response.body);
    }
  };

  const dataDni = async (dni) => {
    Dni(dni);
    if (dni.length == 8) {
      let response = await ajax.dataFromReniec(dni);
      Name(response.nombres);
      Lastname(response.apellido_paterno + ' ' + response.apellido_materno);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#F6F7FA' }}>
        <View style={styles.Login}>
          <Image
            style={{ width: 181, height: 123 }}
            source={require('../../../assets/LogoVertical.png')}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              marginBottom: 30,
              color: '#414968',
              fontFamily: 'Montserrat-Bold',
            }}
          >
            Actualizar Perfil
          </Text>
        </View>

        <TextInput
          style={styles.Input}
          placeholder="DNI"
          keyboardType="numeric"
          onChangeText={(dni) => dataDni(dni)}
          value={dni}
        />

        <TextInput
          style={styles.Input}
          placeholder="Nombres"
          onChangeText={(name) => Name(name)}
          value={name}
          editable={false}
        />

        <TextInput
          style={styles.Input}
          placeholder="Apellidos"
          onChangeText={(lastname) => Lastname(lastname)}
          value={lastname}
          editable={false}
        />

        <TextInput
          style={styles.Input}
          placeholder="Celular"
          keyboardType="numeric"
          onChangeText={(phone) => Phone(phone)}
          value={phone}
          maxLength={9}
        />

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 15,
            height: 50,
            justifyContent: 'space-between',
            marginHorizontal: 25,
            margin: 10,
          }}
        >
          <Text
            onPress={() => setShow(true)}
            style={{
              paddingLeft: 25,
              alignContent: 'center',
              textAlignVertical: 'center',
            }}
          >
            {birthdate.getFullYear() +
              '-' +
              (birthdate.getMonth() < 10
                ? '0' + (birthdate.getMonth() + 1)
                : birthdate.getMonth() + 1) +
              '-' +
              (birthdate.getDate() < 10
                ? '0' + birthdate.getDate()
                : birthdate.getDate())}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              marginRight: 20,
            }}
          >
            <Icon
              name="ios-calendar"
              type="ionicon"
              color="#828282"
              size={24}
              onPress={() => setShow(true)}
            />
          </View>
        </View>

        {show && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View
          style={{
            height: 50,
            borderRadius: 15,
            borderWidth: 0,
            backgroundColor: 'white',
            overflow: 'hidden',
            paddingLeft: 20,
            margin: 10,
            marginHorizontal: 25,
          }}
        >
          <Picker
            style={{
              paddingLeft: 25,
              backgroundColor: 'white',
            }}
            selectedValue={gender}
            onValueChange={(gender) => Gender(gender)}
          >
            <Picker.Item label="Masculino" value="1" />
            <Picker.Item label="Femenino" value="2" />
          </Picker>
        </View>

        <View style={styles.Footer}>
          <Button style={styles.Button} onPress={updateUser}>
            Actualizar
          </Button>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  Input: {
    height: 50,
    backgroundColor: 'white',
    paddingLeft: 25,
    borderRadius: 15,
    margin: 10,
    marginHorizontal: 25,
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
  Footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  Header: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  InputRow: {
    alignItems: 'center',
    width: 360,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientProfileUpdate);
