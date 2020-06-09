import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";
import { Container, Content, Header, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../components/Redux";

const MainSidebar = (props) => {
  const { user } = props;
  useEffect(() => {
    //    console.log("MainSidebar");
  }, []);
  return (
    <Container>
      <Header style={{ justifyContent: "center" }}>
        <Body>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../assets/icons/User.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text
              style={{
                paddingTop: 8,
                paddingLeft: 5,
                fontSize: 20,
              }}
            >
              {user.email.length < 14
                ? `${user.email}`
                : `${user.email.substring(0, 14)}...`}
            </Text>
          </View>
        </Body>
      </Header>
      <Content>
        <DrawerItemList {...props}></DrawerItemList>
      </Content>
    </Container>
  );
};

export default connect(mapStateToProps)(MainSidebar);
