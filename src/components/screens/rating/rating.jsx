import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';

import { getUsers } from '../../../store/reducers/app-store/selectors';
import userProp from '../../../types/user.prop';
import Header from './components/header/header';
import RatingRow from './components/rating-row/rating-row';

const renderItem = ({ item, index }) => <RatingRow user={item} index={index} />;

const Rating = ({ users }) => (
  <View style={styles.container}>
    <FlatList
      ListHeaderComponent={Header}
      data={users}
      renderItem={renderItem}
      keyExtractor={(item, i) => i.toString()}
      stickyHeaderIndices={[0]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
});

Rating.propTypes = {
  navigation: PropTypes.any.isRequired,
  users: PropTypes.arrayOf(userProp).isRequired,
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

export { Rating };
export default connect(mapStateToProps, null)(Rating);
