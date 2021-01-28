import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

const MAX_CHARS_COUNT = 40;

const cutLongText = (string, maxCharsCount) => string.length > maxCharsCount ? string.slice(0, maxCharsCount).trim() + `...` : string;

const Service = ({ service }) => {
  const [isRolledUp, setRolledUp] = useState(false);
  return (
      <View style={styles.container}>
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceItem}>
            {isRolledUp ? service : cutLongText(service, MAX_CHARS_COUNT)}
          </Text>
          {service.length > MAX_CHARS_COUNT && (
              <TouchableOpacity onPress={() => setRolledUp((prevState) => !prevState)}>
                <Entypo
                    style={styles.rollupIcon}
                    name={isRolledUp ? `chevron-up` : `chevron-down`}
                    size={20}
                    color="rgb(0, 122, 255)"
                />
              </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity>
          <AntDesign style={styles.deleteIcon} name={`delete`} size={20} color={`rgb(255, 64, 64)`}/>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: `row`,
    alignItems: `center`,
    marginBottom: 10,
  },
  serviceContainer: {
    padding: 5,
    backgroundColor: `white`,
    width: `80%`,
    borderRadius: 5,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    borderWidth: 1,
    borderColor: `#808080`,
  },
  serviceItem: {
    fontSize: 16,
    paddingRight: 10,
    width: `90%`,
  },
  rollupIcon: {
    marginHorizontal: 5,
  },
  deleteIcon: {
    marginHorizontal: 5,
  },
});

export default Service;
