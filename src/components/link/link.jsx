import React, { useCallback } from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';

const Link = ({ url, children, style }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <TouchableOpacity onPress={handlePress} style={style}>
    {children}
  </TouchableOpacity>;
};

export default Link;
