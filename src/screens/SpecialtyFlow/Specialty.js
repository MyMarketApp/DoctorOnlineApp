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

const Specialty = (props) => {
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
            {specialty.name}
          </Text>
        </Body>
        <Right></Right>
      </Header>
      <FlatList
        data={doctors}
        horizontal={false}
        numColumns="2"
        renderItem={({ item }) => (
          <View
            style={{ width: "50%", alignItems: "center", marginBottom: 20 }}
          >
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={() => console.log("buah")}>
                <Image style={styles.Image} source={{ uri: item.imageUrl }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginTop: 15 }}>{item.name}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Image: {
    width: 140,
    height: 100,
    borderColor: "#dddddd",
    borderWidth: 1,
  },
});

export default Specialty;
