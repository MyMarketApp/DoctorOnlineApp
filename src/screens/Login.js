import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Button from "react-native-button";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import ajax from "../services/Routes";
import * as Google from "expo-google-app-auth";
const IOS_CLIENT_ID =
  "39924446938-nfd43i0so82k0sa09ev2v5tvdu4m3an4.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "39924446938-gvvqhma2i535qh6os4rsqqohqm7pdl79.apps.googleusercontent.com";

const Login = (props) => {
  let [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const { UserType } = props.route.params;
  const [password, Password] = useState("");
  const [email, Email] = useState("");

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const verifyUser = await ajax.verifyUser(result.user.email);
        if (verifyUser.status) {
          // console.log(verifyUser);
          props.navigation.navigate("Main", { user: verifyUser.body });
        } else {
          props.navigation.navigate("LoginProfile", { user: result.user });
        }
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
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Login}>
        <View style={styles.Header}>
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
            Login
          </Text>
        </View>
        <View style={styles.Input}>
          <View style={styles.InputRow}>
            <TextInput
              style={styles.button}
              placeholder="Correo Electrónico"
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
            <Button style={styles.Button} onPress={() => alert("buah")}>
              Continuar
            </Button>
          </View>
        </View>
        <View style={styles.Footer}>
          <Button
            style={styles.Button}
            onPress={() =>
              props.navigation.navigate("UserRegistration", {
                UserType,
              })
            }
          >
            Registrarse
          </Button>
          <Text
            style={{
              color: "#828282",
              fontSize: 18,
              marginBottom: 15,
              marginTop: 15,
              fontFamily: "Montserrat-Medium",
            }}
          >
            o
          </Text>
          <Button style={styles.ButtonGmail} onPress={signInWithGoogle}>
            Ingresar con Gmail
          </Button>
          <Text
            style={{
              color: "#639BEF",
              fontSize: 14,
              textDecorationLine: "underline",
              marginTop: 15,
              fontFamily: "Montserrat-Medium",
            }}
          >
            Términos y condiciones
          </Text>
        </View>
      </View>
    );
  }
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
    flex: 0.4,
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
    backgroundColor: "white",
    paddingLeft: 25,
    borderRadius: 15,
    fontFamily: "Montserrat-Medium",
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
  ButtonGmail: {
    backgroundColor: "#DB4A39",
    textAlignVertical: "center",
    color: "white",
    borderRadius: 15,
    height: 50,
    width: 360,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
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
    flex: 0.3,
    alignItems: "center",
  },
});

export default Login;
