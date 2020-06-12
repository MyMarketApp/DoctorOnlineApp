import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "./stripeSettings";
import { stripeCheckoutRedirectHTML } from "./stripeCheckout";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../components/Redux";

const PurchaseProduct = (props) => {
  const { doctor } = props.route.params;
  const { user } = props;
  useEffect(() => {
    console.log("Purchase Product");
    console.log(user);
  }, []);
  // TODO: this should come from some service/state store

  const onSuccessHandler = () => {
    /* TODO: do something */
    alert("success");
    props.navigation.navigate("Specialties");
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
        html: stripeCheckoutRedirectHTML(user, doctor),
      }}
      onLoadStart={onLoadStart}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseProduct);
