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

const Doctor = (props) => {
  const { doctor } = props.route.params;
  const [schedules, Schedules] = useState([]);
  const [showSchedules, ShowSchedules] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log("Doctor");
    async function retrieveSchedules() {
      const response = await ajax.schedulesDoctor(doctor.id);
      Schedules(response.body);
    }
    retrieveSchedules();
  }, []);

  useEffect(() => {
    async function updateSchedules() {
      ShowSchedules(schedules.filter((s) => s.day == date.getDay()));
    }
    updateSchedules();
  }, [date]);
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
      <FlatList
        data={showSchedules}
        horizontal={false}
        numColumns="2"
        renderItem={({ item }) => (
          <View
            style={{ width: "50%", alignItems: "center", marginBottom: 20 }}
          >
            <View style={{ alignItems: "center" }}>
              <Button style={styles.Button} onPress={() => alert("buah")}>
                {item.start.substring(0, 5)}-{item.end.substring(0, 5)}
              </Button>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
});

export default Doctor;
