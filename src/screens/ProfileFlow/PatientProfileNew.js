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

const PatientProfileNew = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  });
  const { UserId } = props.route.params;
  const [name, Name] = useState();
  const [lastname, Lastname] = useState();
  const [dni, Dni] = useState();
  const [birthdate, Birthdate] = useState(new Date());
  const [gender, Gender] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log('New Profile Patient 1');
  }, []);

  const createUser = async () => {
    if (!dni || !name || !lastname || !birthdate) alert('completar datos');
    else {
      let response = await ajax.addPatient(
        name,
        lastname,
        gender,
        UserId,
        dni,
        birthdate,
        null
      );
      alert(response.message);
      if (response.status) {
        props.addPatient(response.body);
        props.navigation.navigate('Profiles');
      }
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
          onChangeText={(dni) => dataDni(dni)}
          value={dni}
        />

        <TextInput
          style={styles.Input}
          placeholder="Nombres"
          onChangeText={(name) => Name(name)}
          value={name}
          editable={true}
        />

        <TextInput
          style={styles.Input}
          placeholder="Apellidos"
          onChangeText={(lastname) => Lastname(lastname)}
          value={lastname}
          editable={true}
        />

        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 25,
          }}
        >
          <TouchableOpacity onPress={() => setShow(true)}>
            <Image
              source={require('../../../assets/icons/ContactUs.png')}
              style={{
                width: 25,
                height: 25,
                paddingLeft: 25,
              }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, paddingLeft: 25 }}>
            {birthdate.getFullYear() +
              '-' +
              birthdate.getMonth() +
              '-' +
              birthdate.getDate()}
          </Text>
        </View>

        {show && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, value) => {
              Birthdate(value);
              setShow(false);
            }}
          />
        )}

        <Picker
          style={styles.Input}
          selectedValue={gender}
          onValueChange={(gender) => Gender(gender)}
        >
          <Picker.Item label="Masculino" value="1" />
          <Picker.Item label="Femenino" value="2" />
        </Picker>

        <View style={styles.Footer}>
          <Button style={styles.Button} onPress={createUser}>
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
    fontFamily: 'Montserrat-Medium',
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

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfileNew);
