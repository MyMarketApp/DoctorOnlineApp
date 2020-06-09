import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Button from "react-native-button";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import ajax from "../services/Routes";

const UserRegistration = (props) => {
  let [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const { UserType } = props.route.params;
  const [email, Email] = useState();
  const [password, Password] = useState();
  const [password2, Password2] = useState();

  const createUser = async () => {
    if (!email || !password || !password2) alert("completar datos");
    else if (password != password2) alert("contraseñas no coinciden");
    else {
      let response = await ajax.addUser(email, password, null, 5.0, UserType);
      alert(response.message);
      if (response.status)
        props.navigation.navigate("PatientProfile", {
          UserId: response.body.id,
        });
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
            Registro
          </Text>
        </View>

        <TextInput
          style={styles.Input}
          placeholder="Correo"
          onChangeText={(email) => Email(email)}
          value={email}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.Input}
          placeholder="Contraseña"
          onChangeText={(password) => Password(password)}
          value={password}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.Input}
          placeholder="Repetir Contraseña"
          onChangeText={(password2) => Password2(password2)}
          value={password2}
        />

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
});

export default UserRegistration;
