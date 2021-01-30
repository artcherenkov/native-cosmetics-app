import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";

const MAX_CHARS_COUNT = 40;

const cutLongText = (string, maxCharsCount) => string.length > maxCharsCount ? string.slice(0, maxCharsCount).trim() + `...` : string;

const Service = ({ service, data, handleServiceDelete }) => {
  const [isRolledUp, setRolledUp] = useState(false);
  return (
      <View style={styles.container}>
        <View style={{ width: `100%`, zIndex: -1 }}>
          <DropDownPicker
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              searchableError={() => <Text>Not Found</Text>}
              items={data}
              placeholder={service}
              // defaultValue={service}
              containerStyle={{ height: 40, marginBottom: 10, width: `90%`, zIndex: -1 }}
              style={{ backgroundColor: `#fafafa`, color: `black` }}
              itemStyle={{ justifyContent: `flex-start` }}
              dropDownStyle={{ height: 300 }}
              onChangeItem={item => {
                console.log(item);
                setRolledUp(false);
              }}
              dropDownMaxHeight={300}
              labelStyle={{ color: `black` }}
          />
        </View>

        {/*{!isRolledUp*/}
        {/*  ? <TouchableOpacity style={styles.serviceContainer} onPress={() => setRolledUp(true)}>*/}
        {/*      <View>*/}
        {/*        <Text style={styles.serviceItem}>*/}
        {/*          {service}*/}
        {/*        </Text>*/}
        {/*        /!* {service.length > MAX_CHARS_COUNT && ( *!/*/}
        {/*        /!*    <TouchableOpacity onPress={() => setRolledUp((prevState) => !prevState)}> *!/*/}
        {/*        /!*      <Entypo *!/*/}
        {/*        /!*          style={styles.rollupIcon} *!/*/}
        {/*        /!*          name={isRolledUp ? `chevron-up` : `chevron-down`} *!/*/}
        {/*        /!*          size={20} *!/*/}
        {/*        /!*          color="rgb(0, 122, 255)" *!/*/}
        {/*        /!*      /> *!/*/}
        {/*        /!*    </TouchableOpacity> *!/*/}
        {/*        /!* )} *!/*/}
        {/*      </View>*/}
        {/*    </TouchableOpacity>*/}
        {/*  :*/}
        {/*}*/}
        <TouchableOpacity onPress={handleServiceDelete.bind(this, service)}>
          <AntDesign style={styles.deleteIcon} name={`delete`} size={20} color={`rgb(255, 64, 64)`}/>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`,
    marginBottom: 10,
    width: `100%`,
    // zIndex: -1,
  },
  serviceContainer: {
    padding: 5,
    backgroundColor: `white`,
    borderRadius: 5,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    borderWidth: 1,
    borderColor: `#808080`,
    flexGrow: 1,
  },
  serviceItem: {
    fontSize: 16,
    paddingRight: 10,
  },
  rollupIcon: {
    marginHorizontal: 5,
  },
  deleteIcon: {
    marginHorizontal: 5,
  },
});

export default Service;
