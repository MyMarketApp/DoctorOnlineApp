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

const Appointments = (props) => {
  const { appointments } = props;
  const [showAppointments, ShowAppointments] = useState([]);
  useEffect(() => {
    console.log("Appointments");
    async function retrieveAppointments() {
      var d = new Date();
      let date =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 < 10
          ? "0" + (d.getMonth() + 1).toString()
          : (d.getMonth() + 1).toString()) +
        "-" +
        d.getDate();
      ShowAppointments(appointments.filter((a) => a.date >= date));
    }
    retrieveAppointments();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={showAppointments}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("AppointmentDetail", {
                appointment: item,
              })
            }
          >
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
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 50,
    height: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
