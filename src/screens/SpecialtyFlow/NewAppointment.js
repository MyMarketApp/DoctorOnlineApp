import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "react-native-button";
import ajax from "../../services/Routes";
import { Header, Body, Right, Icon, Left } from "native-base";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";

const NewAppointment = (props) => {
  const { date } = props.route.params;
  const { doctor } = props.route.params;
  const { patient } = props.route.params;
  const { schedule } = props.route.params;
  const { selectedPrice } = props.route.params;
  useEffect(() => {
    console.log("New Appointment");
  }, []);

  const createAppointment = async () => {
    const response = await ajax.addAppointment(
      null,
      null,
      null,
      null,
      date,
      doctor.id,
      1,
      patient.id,
      schedule.id
    );
    props.addAppointment(response.body);
    props.navigation.navigate("PurchaseProduct", {
      appointment: response.body,
      selectedPrice,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.TextRow}>
        <Text style={{ fontSize: 25 }}>Datos de la cita</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image style={styles.Image} source={{ uri: doctor.imageUrl }} />
        <Text style={{ fontSize: 25 }}>{doctor.name}</Text>
      </View>
      <View style={styles.TextRow}>
        <Text style={styles.Title}>Fecha: </Text>
        <Text style={styles.Info}>
          {date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()}
        </Text>
      </View>
      <View style={styles.TextRow}>
        <Text style={styles.Title}>Horario: </Text>
        <Text style={styles.Info}>
          {schedule.start.substring(0, 5)}-{schedule.end.substring(0, 5)}
        </Text>
      </View>
      <View style={styles.TextRow}>
        <Text style={styles.Title}>Paciente: </Text>
        <Text style={styles.Info}>{patient.name}</Text>
      </View>

      <View
        style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
      >
        <Button style={styles.Button2} onPress={createAppointment}>
          Continuar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button2: {
    backgroundColor: "#639BEF",
    textAlignVertical: "center",
    color: "white",
    borderRadius: 15,
    height: 50,
    width: 360,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  Title: {
    fontSize: 25,
    color: "blue",
  },
  Info: {
    fontSize: 25,
  },
  TextRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  Image: {
    width: 140,
    height: 100,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);
