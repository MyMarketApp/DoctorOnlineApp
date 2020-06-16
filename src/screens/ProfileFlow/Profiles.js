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
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";
import { Header, Body, Right, Icon, Left } from "native-base";

const Profiles = (props) => {
  const { profiles } = props;
  const { user } = props;
  useEffect(() => {
    console.log("Perfiles");
    console.log(props)
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
          {/* <Title>Seminars</Title> */}
          <Text style={{ fontSize: 20, alignSelf: "center" }}>PERFILES</Text>
        </Body>
        <Right>
          <Icon
            name="add-circle"
            onPress={() =>
              props.navigation.navigate("PatientProfileNew", {
                UserId: user.id,
              })
            }
          ></Icon>
        </Right>
      </Header>
      <FlatList
        data={profiles}
        horizontal={false}
        numColumns="2"
        renderItem={({ item }) => (
          <View
            style={{ width: "50%", alignItems: "center", marginBottom: 20 }}
          >
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("PatientProfileUpdate", {
                    patient: item,
                  })
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

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
