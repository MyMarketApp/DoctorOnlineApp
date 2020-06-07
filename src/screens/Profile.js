import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Button from "react-native-button";
import ajax from "../services/Routes";

const Profile = (props) => {
  return (
    <View style={styles.Profile}>
      <Text>Contact Us</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Profile: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
