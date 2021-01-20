import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Controls = ({ scrollLeft, scrollRight }) => (
  <>
    <TouchableOpacity style={[styles.button, styles.next]} title="next" onPress={scrollRight}>
      <Entypo name="chevron-right" size={20} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, styles.prev]} title="prev" onPress={scrollLeft}>
      <Entypo name="chevron-left" size={20} />
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  button: {
    position: `absolute`,
    top: 80,
  },
  next: {
    right: 10,
  },
  prev: {
    left: 10,
  },
});

Controls.propTypes = {
  scrollLeft: PropTypes.func.isRequired,
  scrollRight: PropTypes.func.isRequired,
};

export default Controls;
