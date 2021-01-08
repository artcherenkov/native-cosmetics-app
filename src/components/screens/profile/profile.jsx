import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View, Text, Button, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

import { getActiveUserId, getUsers } from '../../../store/reducers/app-store/selectors';
import { setUserId } from '../../../store/action';
import { getRandomInt } from '../../../utils/common';

import userProp from '../../../types/user.prop';

const renderRole = ({ item }) => (
  <Text style={styles.role}>
    {`\t`}{item.id}. {item.role}
  </Text>
);

const Profile = ({ navigation, users, activeUserId, onGetAnotherUserClick }) => {
  const user = users.find(user => user.id === activeUserId);

  return (
    <View style={styles.container}>
      {!user
        ? <Text>Loading...</Text>
        : <View style={styles.card}>
          <View style={styles.headerWrapper}>
            <View style={styles.avatarWrapper}>
              {/* <SvgUri width="100%" height="100%" uri={user.avatar}/> */}
            </View>
            <View style={styles.headerContent}>
              <View style={styles.nameWrapper}>
                <Text style={styles.name}>{user.name}</Text>
              </View>
              <View style={styles.ratingWrapper}>
                <View style={styles.rateItem}>
                  <Text style={styles.rating}>{user.rating}</Text>
                  <Text>Рейтинг</Text>
                </View>
                <View style={styles.rateItem}>
                  <Text style={styles.place}>{user.place}</Text>
                  <Text>Место</Text>
                </View>
              </View>
              <Button title="Перейти к рейтингу" onPress={() => navigation.navigate(`Rating`)}/>
            </View>
          </View>
          <View style={styles.bodyWrapper}>
            <Text style={styles.userInfo}>Город: {user.city}</Text>
            <Text style={styles.userInfo}>Филиал: {user.department}</Text>
            {user.roles.length === 1
              ? <Text style={styles.userInfo}>Должность: {user.roles[0].role}</Text>
              : <View>
                <Text style={styles.userInfo}>Должности: </Text>
                <FlatList
                  data={user.roles}
                  renderItem={renderRole}
                  keyExtractor={(item, i) => i.toString()}
                />
              </View>}
          </View>
        </View>}

      <Button title="Сгенерировать пользователя" onPress={onGetAnotherUserClick(users)}/>
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.any.isRequired,
  activeUserId: PropTypes.number,
  users: PropTypes.arrayOf(userProp).isRequired,
  onGetAnotherUserClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: getUsers(state),
  activeUserId: getActiveUserId(state),
});

const mapDispatchToProps = dispatch => ({
  onGetAnotherUserClick(users) {
    return () => dispatch(setUserId(getRandomInt(0, users.length - 1)));
  },
});

export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
