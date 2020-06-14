import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
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
    <View style={styles.ContactUs}>
      <SafeAreaView>
        <Carousel
          layout={"default"}
          //ref={(ref) => (this.carousel = ref)}
          data={appointments}
          sliderWidth={500}
          itemWidth={120}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 15,
                height: 160,
                padding: 10,
                marginLeft: 5,
                marginRight: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Specialty", {
                    specialty: item,
                  })
                }
              >
                <Image style={styles.Image} source={{ uri: item.imageUrl }} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  alignItems: "center",
                  fontFamily: "Montserrat-Bold",
                  color: "#2F2929",
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
          onSnapToItem={(index) => setIndex(index)}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  ContactUs: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
