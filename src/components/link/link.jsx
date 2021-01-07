import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert, Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Link = ({ url, content }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.linkTitle}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkTitle: {
    fontSize: 22,
    color: `rgb(13, 128, 254)`,
    marginBottom: 25,
  },
});

Link.propTypes = {
  url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Link;
