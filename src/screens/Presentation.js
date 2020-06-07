import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Button from 'react-native-button';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const Presentation = (props) => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Presentation}>
        <Image
          style={{ width: 181, height: 123 }}
          source={require('../../assets/LogoVertical.png')}
        />
        <Text style={styles.Title}>
          Accede a un servicio de calidad 24/7, desde la comodidad de tu casa y
          con los mejores profesionales de salud.
        </Text>
        <View style={styles.Buttons}>
          <Button
            style={styles.Button}
            onPress={() => props.navigation.navigate('Login')}
          >
            Soy paciente
          </Button>
          <Button style={styles.Button} onPress={() => console.log('buah')}>
            Soy médico
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Presentation: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F6F7FA',
    alignItems: 'center',
  },
  Title: {
    textAlign: 'center',
    marginTop: 20,
    marginRight: 60,
    marginLeft: 60,
    fontSize: 14,
    color: '#414968',
    fontFamily: 'Montserrat-Medium',
  },
  Buttons: {
    justifyContent: 'space-evenly',
    flex: 0.5,
    // backgroundColor: "blue",
    alignItems: 'center',
  },
  Button: {
    backgroundColor: '#639BEF',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    borderRadius: 15,
    height: 66,
    width: 325,
  },
});

export default Presentation;
