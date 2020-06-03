import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Button from "react-native-button";

const Welcome = (props) => {
  const { user } = props.route.params;
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <View style={styles.Presentation}>
      <View style={styles.Description}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/Flash.png")}
        />
        <Text style={styles.Title}>Bienvenido</Text>
        <Text style={styles.Title}>{user.name}</Text>
      </View>
      <View style={styles.Buttons}>
        <Button style={styles.Button} onPress={() => alert("buah")}>
          Explorar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Presentation: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F6F7FA",
    alignItems: "center",
  },
  Description: {
    justifyContent: "center",
    flex: 0.6,
    alignItems: "center",
  },
  Title: {
    fontSize: 24,
  },
  Buttons: {
    justifyContent: "space-evenly",
    flex: 0.4,
    // backgroundColor: "blue",
    alignItems: "center",
  },
  Button: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    textAlignVertical: "center",
    textAlign: "center",
    color: "green",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    height: 60,
    width: 250,
  },
});

export default Welcome;
