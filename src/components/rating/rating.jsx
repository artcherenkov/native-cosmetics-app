import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Button } from 'react-native';

const Rating = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: `center`, justifyContent: `center` }}>
      <Text style={{ fontSize: 32, marginBottom: 40 }}>Рейтинг</Text>
      <Button
        title="Вернуться к профилю"
        onPress={() => navigation.navigate(`Profile`)}
      />
    </View>
  );
};

Rating.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default Rating;
