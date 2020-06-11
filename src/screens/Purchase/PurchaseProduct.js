import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { STRIPE } from "./stripeSettings";
import { stripeCheckoutRedirectHTML } from "./stripeCheckout";
import { StyleSheet, View, TextInput, Text } from "react-native";

const PurchaseProduct = (props) => {
  useEffect(() => {}, []);
  // TODO: this should come from some service/state store
  const user = { id: "someID" };

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
    console.log("PurchaseProduct");
    const { nativeEvent } = syntheticEvent;
    console.log(nativeEvent);
    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
      onSuccessHandler();
      // return;
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
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>buah</Text>
    // </View>
    <WebView
      originWhitelist={["*"]}
      source={{ html: stripeCheckoutRedirectHTML("cus_HPkAM514m9tnHI") }}
      onLoadStart={onLoadStart}
    />
  );
};

export default PurchaseProduct;
