import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Button from 'react-native-button';
import ajax from '../../services/Routes';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { Header, Body, Right, Icon, Left } from 'native-base';

const Specialties = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });
  const [specialties, Specialties] = useState([]);
  useEffect(() => {
    console.log('Especialidades');
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
      <View style={{ flex: 1, backgroundColor: '#F6F7FA' }}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headTitle}>Especialidades</Text>
            </View>
          }
          columnWrapperStyle={{ marginHorizontal: 15 }}
          data={specialties}
          horizontal={false}
          numColumns="2"
          renderItem={({ item }) => (
            <View style={styles.itemSpeciality}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Specialty', { specialty: item })
                }
              >
                <View style={{ alignItems: 'center' }}>
                  <Image style={styles.Image} source={{ uri: item.imageUrl }} />

                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Image: {
    width: 50,
    height: 50,
  },
  header: {
    marginTop: 58,
    marginLeft: 25,
    marginBottom: 30,
  },
  headTitle: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 28,
    color: '#414968',
  },
  itemSpeciality: {
    flex: 0.5,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#2F2929',
    textAlign: 'center',
  },
});

export default Specialties;
