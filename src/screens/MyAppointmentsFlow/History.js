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

const History = (props) => {
  const [appointments, Appointments] = useState([]);
  useEffect(() => {
    console.log("History");
    async function retrieveAppointments() {
      const response = await ajax.Appointments();
      var d = new Date();
      let date =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 < 10
          ? "0" + (d.getMonth() + 1).toString()
          : (d.getMonth() + 1).toString()) +
        "-" +
        d.getDate();
      let buah = response.body.filter((a) => a.date < date);
      Appointments(response.body.filter((a) => a.date < date));
    }
    retrieveAppointments();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={appointments}
        horizontal={false}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 15,
              height: 80,
              padding: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>
                {item.date} - {item.schedule.start.substring(0, 5)}
              </Text>
              <Text>{item.status.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{item.doctor.specialty.name}</Text>
              <Text>Dr. {item.doctor.name}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ContactUs: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(History);