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

const Specialties = (props) => {
  const [specialties, Specialties] = useState([]);
  useEffect(() => {
    console.log("Especialidades");
    async function retrieveSpecialties() {
      const response = await ajax.Specialties();
      Specialties(response.body);
    }
    retrieveSpecialties();
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
            Especialidades
          </Text>
        </Body>
        <Right>{/* <Icon name="add-circle"></Icon> */}</Right>
      </Header>
      <FlatList
        data={specialties}
        horizontal={false}
        numColumns="2"
        renderItem={({ item }) => (
          <View
            style={{ width: "50%", alignItems: "center", marginBottom: 20 }}
          >
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Specialty", { specialty: item })
                }
              >
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

export default Specialties;
