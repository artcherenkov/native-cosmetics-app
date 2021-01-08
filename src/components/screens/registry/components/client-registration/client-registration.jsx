import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const getBounds = ({ begin, duration }) => {
  return ({
    top: begin.hours() * 60 + begin.minutes(),
    height: duration,
  });
};

// todo подумать над названием компонента
const ClientRegistration = (props) => {
  const { navigation, registration, activeDate } = props;

  const handlePress = () => {
    navigation.setOptions({ title: activeDate.format(`MMM D`) });
    navigation.navigate(`EventScreen`, { registration });
  };

  return (
    <TouchableOpacity style={[styles.container, getBounds(registration)]} onPress={handlePress}>
      <Text style={styles.title}>
        {registration.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `rgba(0, 122, 255, .2)`,
    width: 200,
    position: `absolute`,
    padding: 5,
    zIndex: 2,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderColor: `rgb(0, 121, 255)`,
    overflow: `scroll`,
  },
  title: {
    color: `rgb(0, 121, 255)`,
    fontWeight: `bold`,
  },
});

// todo описать подробнее объект registration
ClientRegistration.propTypes = {
  navigation: PropTypes.any.isRequired,
  registration: PropTypes.object.isRequired,
  activeDate: PropTypes.any,
};

export default ClientRegistration;
