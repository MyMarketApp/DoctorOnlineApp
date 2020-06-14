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

const AppointmentDetail = (props) => {
  useEffect(() => {
    console.log("AppointmentDetail");
    async function retrieveAppointments() {}
    retrieveAppointments();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Text>gaaaa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ContactUs: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);
