import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "./stripeSettings";
import { stripeCheckoutRedirectHTML } from "./stripeCheckout";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";
import ajax from "../../services/Routes";

const PurchaseProduct = (props) => {
  const { appointment } = props.route.params;
  const { selectedPrice } = props.route.params;
  const { user } = props;

  useEffect(() => {
    console.log("Purchase Product");
    // console.log(props);
  }, []);
  // TODO: this should come from some service/state store

  const onSuccessHandler = async () => {
    /* TODO: do something */
    const response = await ajax.updateAppointment(
      appointment.id,
      appointment.diagnostic,
      appointment.prescription,
      appointment.comment,
      appointment.score,
      appointment.date,
      appointment.idDoctor,
      2,
      appointment.idPatient,
      appointment.idSchedule
    );
    console.log(response.body);
    props.navigation.navigate("NewAppointmentSuccess");
  };
  const onCanceledHandler = () => {
    /* TODO: do something */
    console.log("canceled");
  };

  // Called everytime the URL stats to load in the webview
  onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      onSuccessHandler();
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
      onCanceledHandler();
    }
  };

  // Render
  if (!user) {
    return null;
  }

  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        html: stripeCheckoutRedirectHTML(user, selectedPrice),
      }}
      onLoadStart={onLoadStart}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseProduct);
