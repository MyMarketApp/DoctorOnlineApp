import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Button from 'react-native-button';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-community/picker';

const Login = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  const [name, Name] = useState('');
  const [lastname, Lastname] = useState('');
  const [dni, Dni] = useState('');
  const [birthdate, Birthdate] = useState('15-05-1990');
  const [gender, setGender] = useState('');
  const [phone, Phone] = useState('');

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#F6F7FA' }}>
        <View style={styles.Login}>
          <Image
            style={{ width: 181, height: 123 }}
            source={require('../../assets/LogoVertical.png')}
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
            Completar Perfil
          </Text>
        </View>

        <TextInput
          style={styles.Input}
          placeholder="Nombres"
          onChangeText={(name) => Name(name)}
          value={name}
        />

        <TextInput
          style={styles.Input}
          placeholder="Apellidos"
          onChangeText={(lastname) => Lastname(lastname)}
          value={lastname}
        />

        <TextInput
          style={styles.Input}
          placeholder="DNI"
          onChangeText={(dni) => Dni(dni)}
          value={dni}
        />

        <DatePicker
          style={{
            height: 50,
            backgroundColor: 'white',
            paddingLeft: 25,
            borderRadius: 15,
            margin: 10,
            marginHorizontal: 25,
            justifyContent: 'center',
            width: 360,
          }}
          date={birthdate} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1901"
          maxDate="31-12-2020"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // top: 4,
              // marginLeft: 0,
            },
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
              fontFamily: 'Montserrat-Medium',
            },
          }}
          onDateChange={(birthdate) => Birthdate(birthdate)}
        />
        <View style={styles.InputPicker}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Femenino" value="femenino" />
          </Picker>
        </View>

        <TextInput
          style={styles.Input}
          placeholder="Número de celular"
          onChangeText={(phone) => Phone(phone)}
          value={phone}
        />

        <View style={styles.Footer}>
          <Button
            style={styles.Button}
            onPress={() => props.navigation.navigate('Welcome')}
          >
            Crear
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
  InputPicker: {
    height: 50,
    backgroundColor: 'white',
    paddingLeft: 18,
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
    //width: '100%',
    //flex: 0.3,
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default Login;
