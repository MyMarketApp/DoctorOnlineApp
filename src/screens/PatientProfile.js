import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Picker,
} from "react-native";
import Button from "react-native-button";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import ajax from "../services/Routes";

const PatientProfile = (props) => {
  let [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const { UserId } = props.route.params;
  const [name, Name] = useState();
  const [lastname, Lastname] = useState();
  const [dni, Dni] = useState();
  const [birthdate, Birthdate] = useState(new Date("2016-03-25"));
  const [gender, Gender] = useState(1);

  const createUser = async () => {
    if (!dni || !name || !lastname || !birthdate) alert("completar datos");
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
      console.log(response);
      if (response.status)
        props.navigation.navigate("Welcome", {
          UserId,
          name: response.body.name,
        });
    }
  };

  const dataDni = async (dni) => {
    Dni(dni);
    if (dni.length == 8) {
      let response = await ajax.dataFromReniec(dni);
      Name(response.nombres);
      Lastname(response.apellido_paterno + " " + response.apellido_materno);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "#F6F7FA" }}>
        <View style={styles.Login}>
          <Image
            style={{ width: 181, height: 123 }}
            source={require("../../assets/LogoVertical.png")}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              marginBottom: 30,
              color: "#414968",
              fontFamily: "Montserrat-Bold",
            }}
          >
            Completar Perfil
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
          editable={false}
        />

        <TextInput
          style={styles.Input}
          placeholder="Apellidos"
          onChangeText={(lastname) => Lastname(lastname)}
          value={lastname}
          editable={false}
        />

        <DatePicker
          style={styles.Input}
          date={birthdate} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          value={birthdate}
          onDateChange={(birthdate) => Birthdate(birthdate)}
        />

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
            Continuar
          </Button>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  Input: {
    height: 50,
    backgroundColor: "white",
    paddingLeft: 25,
    borderRadius: 15,
    fontFamily: "Montserrat-Medium",
    margin: 10,
    marginHorizontal: 25,
  },
  Button: {
    backgroundColor: "#639BEF",
    textAlignVertical: "center",
    color: "white",
    borderRadius: 15,
    height: 50,
    width: 360,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  Footer: {
    alignItems: "center",
    paddingTop: 20,
  },
  Header: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  InputRow: {
    alignItems: "center",
    width: 360,
  },
});

export default PatientProfile;
