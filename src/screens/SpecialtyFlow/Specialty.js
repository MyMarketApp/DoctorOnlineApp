import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "react-native-button";
import ajax from "../../services/Routes";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { Header, Body, Right, Icon, Left } from "native-base";

const Specialty = (props) => {
  let [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("../../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("../../../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  const { specialty } = props.route.params;
  const [doctors, Doctors] = useState([]);
  useEffect(() => {
    console.log("Especialidad");
    async function retrieveSpecialty() {
      const response = await ajax.doctorsSpecialty(specialty.id);
      Doctors(response.body);
    }
    retrieveSpecialty();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#F6F7FA" }}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headTitle}>{specialty.name}</Text>
              <Text style={styles.headDesc}>
                Aqui va la descripcion, fingiendo que sea un texto largo{" "}
                {specialty.imageUrl}
              </Text>
              <View style={styles.secHeader}>
                <Text style={styles.secTitle}>
                  Doctores Afiliados{" "}
                  <Text style={styles.totDocsText}>({doctors.length})</Text>
                </Text>
              </View>
            </View>
          }
          data={doctors}
          horizontal={false}
          numColumns="1"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Doctor", { doctor: item })
              }
            >
              <View style={styles.topDoc}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Image
                      style={styles.ImageDoc}
                      source={{ uri: item.imageUrl }}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      marginHorizontal: 10,
                    }}
                  >
                    <View>
                      <Text style={styles.docNameText}>
                        {item.idGender === 1 ? "Dr." : "Dra."} {item.name}{" "}
                        {item.lastName}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.docSpecText}>{item.description}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight: 5,
                  }}
                >
                  <Text style={styles.rateText}>{item.rate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Image: {
    width: 140,
    height: 100,
  },
  header: {
    marginTop: 58,
    marginHorizontal: 25,
    marginBottom: 30,
  },
  headTitle: {
    fontFamily: "Montserrat-ExtraBold",
    fontSize: 28,
    color: "#414968",
    marginBottom: 34,
  },
  headDesc: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#2F2929",
    textAlign: "justify",
    marginBottom: 34,
  },
  SecHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  secTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#414968",
  },
  totDocsText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#828282",
  },
  topDoc: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 25,
  },
  ImageDoc: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  docNameText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#2F2929",
  },
  docSpecText: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#4F4F4F",
  },
  rateText: {
    fontSize: 30,
    fontFamily: "Montserrat-Bold",
    color: "#F2C94C",
    textAlignVertical: "top",
  },
});

export default Specialty;
