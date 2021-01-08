import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Place = {
  1: `#f5c22e`,
  2: `#c0c0c0`,
  3: `#cd7f32`,
};

const Medal = ({ place }) => (
  <View style={styles.medalContainer}>
    <FontAwesome5 name="medal" color={Place[place]} size={20}/>
  </View>
);

Medal.propTypes = {
  place: PropTypes.number.isRequired,
};

const RatingRow = ({ user, index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.placeContainer}>
        {index < 3 && <Medal place={index + 1} />}
        <Text style={styles.place}>{index + 1}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.avatarContainer}>
          <SvgUri width="100%" height="100%" uri={user.avatar}/>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <Text style={styles.userRating}>{user.rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingRight: 10,
    marginBottom: 20,
  },
  placeContainer: {
    fontSize: 16,
    width: 50,
    flexDirection: `row`,
    alignItems: `center`,
  },
  place: {
    textAlign: `center`,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: `row`,
    alignItems: `center`,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 40 / 2,
    backgroundColor: `rgb(101, 201, 255)`,
  },
  userName: {
    fontSize: 16,
    textAlign: `left`,
    flexGrow: 1,
  },
  userRating: {
    fontSize: 16,
    width: 70,
    textAlign: `center`,
  },
  medalContainer: {
    marginRight: 5,
  },
});

// todo  подробнее описать тип user'а
RatingRow.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default RatingRow;
