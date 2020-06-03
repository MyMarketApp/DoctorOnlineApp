import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Button from "react-native-button";
import ajax from "../services/Routes";
import * as Google from "expo-google-app-auth";
const IOS_CLIENT_ID =
  "39924446938-nfd43i0so82k0sa09ev2v5tvdu4m3an4.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "39924446938-gvvqhma2i535qh6os4rsqqohqm7pdl79.apps.googleusercontent.com";

const Login = (props) => {
  const [password, Password] = useState("");
  const [password2, Password2] = useState("");
  const [email, Email] = useState("");

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        props.navigation.navigate("Welcome", { user: result.user });
        // const verifyUser = await ajax.verifyUser(result.user.email);
        // if (verifyUser.status) {
        //   props.navigation.navigate("Main", { user: verifyUser.body });
        // } else {
        //   const createUser = await ajax.addUser(
        //     result.user.email,
        //     null,
        //     result.user.givenName,
        //     result.user.familyName,
        //     null,
        //     null,
        //     null
        //   );
        //   if (createUser.status) {
        //     props.navigation.navigate("Main", { user: verifyUser.body });
        //   }
        // }
        console.log("LoginScreen.js.js 21 | ", result);
        // result.accessToken;
      } else {
        alert("GG");
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
    }
  };
  const verifyLogin = async (email, password) => {
    const response = await ajax.loginUser(email, password);
    alert(response.message);
    if (response.status) {
      props.navigation.navigate("Main", { user: response.body });
    }
  };
  return (
    <View style={styles.Login}>
      <View style={styles.Header}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/Flash.png")}
        />
        <Text style={{ fontSize: 24, marginTop: 20 }}>Crear cuenta</Text>
      </View>
      <View style={styles.Input}>
        <View style={styles.InputRow}>
          <TextInput
            style={styles.button}
            placeholder="Correo Electronico"
            onChangeText={(email) => Email(email)}
            value={email}
          />
        </View>
        <View style={styles.InputRow}>
          <TextInput
            secureTextEntry={true}
            style={styles.button}
            placeholder="Contraseña"
            onChangeText={(password) => Password(password)}
            value={password}
          />
        </View>
        <View style={styles.InputRow}>
          <TextInput
            secureTextEntry={true}
            style={styles.button}
            placeholder="Repetir Contraseña"
            onChangeText={(password2) => Password2(password2)}
            value={password2}
          />
        </View>
        <Button style={styles.Button} onPress={() => alert("buah")}>
          Continuar
        </Button>
      </View>
      <View style={styles.Footer}>
        <Button style={styles.Button} onPress={signInWithGoogle}>
          Ingresar con Gmail
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    backgroundColor: "#F6F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  LoginInput: {
    flex: 1,
  },
  Header: {
    width: "100%",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  Footer: {
    width: "100%",
    flex: 0.3,
    alignItems: "center",
    paddingTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    paddingLeft: 25,
    borderRadius: 10,
  },
  Button: {
    backgroundColor: "#fff",
    textAlignVertical: "center",
    color: "green",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: 360,
  },
  InputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: 360,
  },
  Input: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    flex: 0.5,
    alignItems: "center",
  },
});

export default Login;
