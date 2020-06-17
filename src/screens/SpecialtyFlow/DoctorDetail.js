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
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../components/Redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { Icon } from 'react-native-elements';

const Doctor = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });
  const { doctor } = props.route.params;
  const { doctorSpec } = props.route.params;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F7FA' }}>
        <View style={styles.header}>
          <Text style={styles.headTitle}>
            {doctor.idGender === 1 ? 'Dr.' : 'Dra.'} {doctor.name}{' '}
            {doctor.lastName}
          </Text>
          <Text style={styles.headSpec}>{doctorSpec}</Text>
        </View>

        <View style={styles.secImage}>
          <View>
            <Image style={styles.ImageDoc} source={{ uri: doctor.imageUrl }} />
          </View>
          <View style={styles.rateBlock}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.rateTxt}>{doctor.rate}</Text>
              <Icon name="ios-star" type="ionicon" color="#F2C94C" size={15} />
            </View>

            <Text style={styles.blockTxt}>Calificación</Text>
          </View>
          <View style={styles.appoBlock}>
            <Text style={styles.appoTxt}>250</Text>
            <Text style={styles.blockTxt}>Citas atendidas</Text>
          </View>
        </View>

        <View style={styles.secDesc}>
          <Text style={styles.docDesc}>{doctor.description}</Text>
          <Button
            style={styles.ButtonMain}
            onPress={() =>
              props.navigation.navigate('DoctorCreateAppo', {
                doctor: doctor,
              })
            }
          >
            Reservar cita
          </Button>
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={styles.secTitle}>
            Tarifas
            <Text style={styles.secSubtitle}> (Por sesión de 20 minutos)</Text>
          </Text>
          <View style={styles.secPrice}>
            <View style={styles.serviceBlock}>
              <Icon
                name="ios-chatbubbles"
                type="ionicon"
                color="#639BEF"
                size={30}
              />
              <Text style={styles.servicePrice}>S/. 50</Text>
            </View>
            <View style={styles.serviceBlock}>
              <Icon name="ios-call" type="ionicon" color="#639BEF" size={30} />
              <Text style={styles.servicePrice}>S/. 80</Text>
            </View>
            <View style={styles.serviceBlock}>
              <Icon
                name="ios-videocam"
                type="ionicon"
                color="#639BEF"
                size={30}
              />
              <Text style={styles.servicePrice}>S/. 150</Text>
            </View>
          </View>
        </View>

        <View style={styles.secComments}>
          <Text style={styles.secTitle}>
            Comentarios
            <Text style={styles.secSubtitle}> (0)</Text>
          </Text>
          <Text style={styles.secSubtitle}>Ver más</Text>
          {/* Agregar flatlist para seccion comentarios */}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    marginTop: 58,
    marginHorizontal: 25,
    marginBottom: 30,
  },
  headTitle: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 28,
    color: '#414968',
    marginBottom: 5,
  },
  headSpec: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#828282',
  },
  secImage: {
    marginHorizontal: 25,
    marginBottom: 25,
    flexDirection: 'row',
  },
  ImageDoc: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  rateBlock: {
    flex: 0.9,
    width: 87,
    height: 100,
    //backgroundColor: '#EAECF4',
    borderRadius: 15,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#F2C94C',
    marginBottom: 5,
  },
  blockTxt: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: '#828282',
  },
  appoBlock: {
    flex: 0.9,
    width: 87,
    height: 100,
    //backgroundColor: '#EAECF4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appoTxt: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#639BEF',
    marginBottom: 5,
  },
  secDesc: {
    flexDirection: 'column',
    marginHorizontal: 25,
    marginBottom: 25,
  },
  docDesc: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#2F2929',
    textAlign: 'justify',
    marginBottom: 25,
  },
  ButtonMain: {
    backgroundColor: '#639BEF',
    textAlignVertical: 'center',
    color: 'white',
    borderRadius: 15,
    height: 50,
    width: 360,
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  secTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#414968',
  },
  secSubtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#828282',
  },
  secPrice: {
    flexDirection: 'row',
    marginVertical: 25,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  serviceBlock: {
    width: 70,
    height: 70,
    backgroundColor: '#EAECF4',
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servicePrice: {
    marginTop: 3,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#2F2929',
  },
  secComments: {
    marginHorizontal: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
