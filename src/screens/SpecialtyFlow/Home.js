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
import Button from "react-native-button";
import ajax from "../../services/Routes";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";

const Home = (props) => {
  let [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("../../../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
  });
  const {specialties} = props;
  const [topdoctors, TopDoctors] = useState([]);
  const [index, setIndex] = useState();

  useEffect(() => {
    console.log("EspecialidadesMain");
    async function retrieveTopDoctors() {
      const response = await ajax.TopDoctors();
      TopDoctors(response.body);
    }
    retrieveTopDoctors();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#F6F7FA" }}>
        <View style={styles.logo}>
          <Image
            style={{ width: 253, height: 34 }}
            source={require("../../../assets/LogoHorizontal.png")}
          />
        </View>
        <View style={styles.alert}>
          <Text>Usted no tiene citas reservadas</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.SecHeader}>
            <Text style={styles.Sectitle}>Especialidades</Text>
            <Text
              style={styles.link}
              onPress={() => props.navigation.navigate("Specialties")}
            >
              Ver más
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <SafeAreaView>
              <Carousel
                layout={"default"}
                //ref={(ref) => (this.carousel = ref)}
                data={specialties}
                sliderWidth={500}
                itemWidth={120}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Specialty", {
                        specialty: item,
                      })
                    }
                  >
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
                      <Image
                        style={styles.Image}
                        source={{ uri: item.imageUrl }}
                      />

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
                  </TouchableOpacity>
                )}
                onSnapToItem={(index) => setIndex(index)}
              />
            </SafeAreaView>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.SecHeader}>
            <Text style={styles.Sectitle}>Doctores Populares</Text>
            <Text style={styles.link}>Ver más</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FlatList
              data={topdoctors}
              horizontal={false}
              numColumns="1"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Doctor", { doctor: item })
                  }
                >
                  <View style={styles.topDoc}>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Image
                          style={styles.ImageDoc}
                          source={{ uri: item.imageUrl }}
                        />
                      </View>

                      <View style={{ flexDirection: "column", marginLeft: 10 }}>
                        <View>
                          <Text style={styles.docNameText}>
                            {item.idGender === 1 ? "Dr." : "Dra."} {item.name}{" "}
                            {item.lastName}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.docSpecText}>
                            {item.specialty.name}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginRight: 5,
                      }}
                    >
                      <Text style={styles.rateText}>{item.rate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  logo: {
    //flex: 1,
    marginLeft: 25,
    marginTop: 58,
  },
  alert: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 66,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 25,
  },
  section: {
    marginHorizontal: 25,
    marginTop: 25,
  },
  SecHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  Sectitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#414968",
  },
  link: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    color: "#828282",
  },
  Image: {
    width: 50,
    height: 50,
  },
  topDoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EAECF4",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  ImageDoc: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  docNameText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#2F2929",
  },
  docSpecText: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#4F4F4F",
  },
  rateText: {
    fontSize: 30,
    fontFamily: "Montserrat-Bold",
    color: "#F2C94C",
    textAlignVertical: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);