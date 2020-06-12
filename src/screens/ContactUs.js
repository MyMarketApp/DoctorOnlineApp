import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Button from 'react-native-button';
import ajax from '../services/Routes';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Carousel from 'react-native-snap-carousel';

const ContactUs = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
  });
  const [specialties, Specialties] = useState([]);
  const [index, setIndex] = useState();

  useEffect(() => {
    console.log('EspecialidadesMain');
    async function retrieveSpecialties() {
      const response = await ajax.Specialties();
      Specialties(response.body);
    }
    retrieveSpecialties();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: '#F6F7FA' }}>
        <View style={styles.logo}>
          <Image
            style={{ width: 253, height: 34 }}
            source={require('../../assets/LogoHorizontal.png')}
          />
        </View>
        <View style={styles.alert}>
          <Text>Usted no tiene citas reservadas</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>Especialidades</Text>
            <Text
              style={styles.link}
              onPress={() => props.navigation.navigate('Specialties')}
            >
              Ver más
            </Text>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
          >
            <SafeAreaView>
              <Carousel
                layout={'default'}
                //ref={(ref) => (this.carousel = ref)}
                data={specialties}
                sliderWidth={500}
                itemWidth={120}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 15,
                      height: 160,
                      padding: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Specialty', {
                          specialty: item,
                        })
                      }
                    >
                      <Image
                        style={styles.Image}
                        source={{ uri: item.imageUrl }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        marginTop: 15,
                        alignItems: 'center',
                        fontFamily: 'Montserrat-Bold',
                        color: '#2F2929',
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
        </View>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>Doctores Populares</Text>
            <Text style={styles.link}>Ver más</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    marginLeft: 25,
    marginTop: 58,
  },
  alert: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 25,
  },
  section: {
    marginHorizontal: 25,
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#414968',
  },
  link: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#828282',
  },
  Image: {
    width: 50,
    height: 50,
  },
});

export default ContactUs;
