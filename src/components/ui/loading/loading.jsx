import { ActivityIndicator, View, StyleSheet } from "react-native";
import React from "react";

const Loading = () => (
    <View style={styles.overlay}>
      <ActivityIndicator size="large"/>
    </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: `absolute`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    top: 0,
    left: 0,
    height: `100%`,
    width: `100%`,
    zIndex: 500,
    backgroundColor: `rgba(255, 255, 255, .7)`,
  },
});

export default Loading;
