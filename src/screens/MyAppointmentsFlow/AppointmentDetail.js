import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";
import Button from "react-native-button";
import ajax from "../../services/Routes";
import Carousel from "react-native-snap-carousel";
import { Item } from "native-base";

const AppointmentDetail = (props) => {
  const { appointment } = props.route.params;
  useEffect(() => {
    console.log("AppointmentDetail");
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginTop: 20 }}>
        {appointment.date} - {appointment.schedule.start.substring(0, 5)} |{" "}
        {appointment.patient.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 15,
          height: 80,
          padding: 10,
          marginTop: 20,
          width: 350,
        }}
      >
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.Image}
            source={{ uri: appointment.doctor.imageUrl }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>
            Dr. {appointment.doctor.name} {appointment.doctor.lastName}
          </Text>
          <Text>{appointment.doctor.specialty.name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Por Calificar</Text>
        </View>
      </View>
      <Text style={{ fontSize: 20, marginTop: 20 }}>Diagnostico</Text>
      <View style={styles.Text}>
        <Text>{appointment.diagnostic}</Text>
      </View>
      <Text style={{ fontSize: 20, marginTop: 20 }}>Receta</Text>
      <View style={styles.Text}>
        <Text>{appointment.prescription}</Text>
      </View>
      <Text style={{ fontSize: 20, marginTop: 20 }}>Pago</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text style={{ fontSize: 20, marginTop: 20 }}>Tarifa</Text>
        <Text style={{ fontSize: 20, marginTop: 20 }}>{appointment.rate}</Text>
      </View>
      <Button style={styles.Button} onPress={() => alert("buah")}>
        Asistir
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 70,
    height: 70,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  Text: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    height: 110,
    padding: 10,
    marginTop: 20,
    width: 350,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);
