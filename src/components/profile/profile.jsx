import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View, Text, Button, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

import { getActiveUserId, getUsers } from '../../store/reducers/app-store/selectors';
import { setUserId } from '../../store/action';
import { getRandomInt } from '../../utils/common';

import userProp from '../../types/user.prop';

const renderItem = ({ item }) => (
  <Text style={{ marginBottom: 20, fontSize: 16 }}>{`\t`}{item.id}. {item.role}</Text>
);

const Profile = ({ navigation, users, activeUserId, onGetAnotherUserClick }) => {
  const user = users.find(user => user.id === activeUserId);

  return (
    <View style={{ flex: 1, alignItems: `center`, justifyContent: `center`, marginTop: 20 }}>
      {user
        ? <View style={styles.card}>
          <View style={styles.headerWrapper}>
            <View style={styles.avatarWrapper}>
               {/* <SvgUri width="100%" height="100%" uri={user.avatar}/> */}
            </View>
            <View style={styles.headerContent}>
              <View style={styles.nameWrapper}>
                <Text style={{ fontSize: 26 }}>{user.name}</Text>
              </View>
              <View style={styles.ratingWrapper}>
                <View style={styles.rateItem}>
                  <Text style={{ fontSize: 28 }}>{user.rating}</Text>
                  <Text>Рейтинг</Text>
                </View>
                <View style={styles.rateItem}>
                  <Text style={{ fontSize: 28 }}>{user.place}</Text>
                  <Text>Место</Text>
                </View>
              </View>
              <Button title="Перейти к рейтингу" onPress={() => navigation.navigate(`Rating`)}/>
            </View>
          </View>
          <View style={styles.bodyWrapper}>
            <Text style={{ marginBottom: 20, fontSize: 18 }}>Город: {user.city}</Text>
            <Text style={{ marginBottom: 20, fontSize: 18 }}>Филиал: {user.department}</Text>
            {user.roles.length === 1
              ? <Text style={{ marginBottom: 20, fontSize: 18 }}>Должность: {user.roles[0].role}</Text>
              : <View>
                <Text style={{ marginBottom: 20, fontSize: 18 }}>Должности: </Text>
                <FlatList
                  data={user.roles}
                  renderItem={renderItem}
                  keyExtractor={(item, i) => i.toString()}
                />
              </View>}
          </View>
        </View>
        : <Text>Loading...</Text>}

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
  onGetAnotherUserClick (users) {
    return () => dispatch(setUserId(getRandomInt(0, users.length - 1)));
  },
});

export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
