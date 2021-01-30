import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, Text, TextInput, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { range } from "../../../utils/common";

// LogBox.ignoreLogs([
//   `VirtualizedLists should never be nested`, // TODO: Remove when fixed
// ]);

const DATA = range(400).reduce((acc, item) => {
  acc = [...acc, { title: `item #${item}`, key: `${Math.random()}${new Date()}` }];
  return acc;
}, []);

const Picker = ({ data = DATA, initialValue, onItemChange }) => {
  const [searchValue, setSearchValue] = useState(``);
  const [pickedItem, setPickedItem] = useState(initialValue || data[0]);
  const [isPickerOpened, setIsPickerOpened] = useState(false);

  const handleInputChange = (value) => setSearchValue(value);
  const handleItemChange = (newItem) => {
    const oldItem = pickedItem;
    setPickedItem(newItem);
    setIsPickerOpened(false);
    onItemChange(newItem, oldItem);
  };
  const togglePicker = () => {
    setIsPickerOpened((prevState) => !prevState);
    setSearchValue(``);
  };

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={handleItemChange.bind(this, item)}>
        <View style={styles.listItem}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
  );

  const getPickedValueContainerStyles = () => !isPickerOpened ? styles.pickedValueContainer : [styles.pickedValueContainer, styles.pickedValueContainerActive];

  return (
      <View style={styles.container} >
        <TouchableOpacity style={getPickedValueContainerStyles()} onPress={togglePicker}>
          <Text style={styles.pickedValue}>{pickedItem.title}</Text>
          <FontAwesome style={styles.icon} name="unsorted" size={15} color="#808080"/>
        </TouchableOpacity>
        {isPickerOpened && <View style={styles.pickerContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
                style={styles.searchInput}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Поиск..."
                onChangeText={handleInputChange}
            />
          </View>
          <View>
            <FlatList
                data={data.slice().filter((item) => item.title.toLowerCase().includes(searchValue))}
                style={styles.list}
                initialNumToRender={20}
                removeClippedSubviews={true}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
            />
          </View>
        </View>}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  list: {
    height: 350,
    paddingTop: 5,
  },
  listItem: {
    padding: 5,
  },
  searchWrapper: {
    padding: 5,
  },
  searchInput: {
    paddingVertical: 5,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderColor: `#cbcbcb`,
  },
  pickedValueContainer: {
    padding: 10,
    width: `100%`,
    flexDirection: `row`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: `#909090`,
    borderRadius: 5,
  },
  pickedValueContainerActive: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  pickedValue: {
    flexGrow: 1,
    maxWidth: `95%`,
  },
  icon: {
    marginHorizontal: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: `#909090`,
    borderTopWidth: 0,
  },
});

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, null)(Picker);
