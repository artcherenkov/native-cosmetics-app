import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Button } from 'react-native';

const Registry = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: `center`, justifyContent: `center` }}>
      <Text style={{ fontSize: 32, marginBottom: 40 }}>Журнал записей</Text>
      <Button
        title="Вернуться на главную"
        onPress={() => navigation.navigate(`MainScreen`)}
      />
    </View>
  );
};

Registry.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Registry;
