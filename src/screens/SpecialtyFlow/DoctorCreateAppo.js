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

const Doctor = (props) => {
  const { doctor } = props.route.params;
  const { profiles } = props;
  const [schedules, Schedules] = useState([]);
  const [selectedschedule, SelectedSchedule] = useState();
  const [selectedProfile, SelectedProfile] = useState();
  const [showSchedules, ShowSchedules] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("Doctor");
    async function retrieveSchedules() {
      const response = await ajax.schedulesDoctor(doctor.id);
      Schedules(response.body);
      ShowSchedules(response.body.filter((s) => s.day == date.getDay()));
    }
    retrieveSchedules();
  }, []);

  useEffect(() => {
    async function updateSchedules() {
      ShowSchedules(schedules.filter((s) => s.day == date.getDay()));
    }
    updateSchedules();
  }, [date]);

  const createAppointment = () => {
    if (!selectedProfile || !selectedschedule) alert("Completar datos");
    else
      props.navigation.navigate("NewAppointment", {
        doctor,
        date,
        schedule: selectedschedule,
        patient: selectedProfile,
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Left>
          <Icon
            name="menu"
            onPress={() => props.navigation.openDrawer()}
          ></Icon>
        </Left>
        <Body>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            {doctor.name}
          </Text>
        </Body>
        <Right></Right>
      </Header>
      <Text style={{ fontSize: 25, paddingLeft: 25 }}>Seleccione Fecha</Text>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 25,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => setShow(true)}>
          <Image
            source={require("../../../assets/icons/ContactUs.png")}
            style={{
              width: 25,
              height: 25,
              paddingLeft: 25,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, paddingLeft: 25 }}>
          {date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()}
        </Text>
      </View>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, value) => {
            setDate(value);
            setShow(false);
          }}
        />
      )}
      <Text style={{ fontSize: 25, paddingLeft: 25 }}>Seleccione Horario</Text>
      <Text style={{ paddingLeft: 25 }}>
        {showSchedules.length} encontrados
      </Text>
      <View style={{ flex: 0.6 }}>
        <FlatList
          data={showSchedules}
          horizontal={false}
          numColumns="2"
          renderItem={({ item }) => (
            <View
              style={{ width: "50%", alignItems: "center", marginBottom: 20 }}
            >
              <View style={{ alignItems: "center" }}>
                <Button
                  style={
                    selectedschedule && selectedschedule.id == item.id
                      ? styles.ButtonSelected
                      : styles.Button
                  }
                  onPress={() => SelectedSchedule(item)}
                >
                  {item.start.substring(0, 5)}-{item.end.substring(0, 5)}
                </Button>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Text style={{ fontSize: 25, paddingLeft: 25 }}>Seleccione Perfil</Text>
      <View style={{ flex: 0.3 }}>
        <FlatList
          data={profiles}
          horizontal={false}
          numColumns="2"
          renderItem={({ item }) => (
            <View
              style={{ width: "50%", alignItems: "center", marginBottom: 20 }}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={() => SelectedProfile(item)}>
                  <Image
                    style={
                      selectedProfile && selectedProfile.id == item.id
                        ? styles.ImageSelected
                        : styles.Image
                    }
                    source={{ uri: item.imageUrl }}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginTop: 15 }}>{item.name}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
      >
        <Button style={styles.Button2} onPress={createAppointment}>
          Continnuar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#639BEF",
    textAlignVertical: "center",
    color: "white",
    borderRadius: 15,
    height: 50,
    width: 100,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  ButtonSelected: {
    backgroundColor: "green",
    textAlignVertical: "center",
    color: "white",
    borderRadius: 15,
    height: 50,
    width: 100,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  Image: {
    width: 140,
    height: 100,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
  ImageSelected: {
    width: 140,
    height: 100,
    borderColor: "#dddddd",
    borderWidth: 1,
    opacity: 0.3,
  },
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
