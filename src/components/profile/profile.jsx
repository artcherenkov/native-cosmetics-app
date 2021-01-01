import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { SvgUri } from 'react-native-svg';

import styles from './styles';
import {connect} from 'react-redux';
import {getActiveUserId, getUsers} from '../../store/reducers/app-store/selectors';
import {setUserId} from '../../store/action';
import {getRandomArrayItem, getRandomInt} from '../../utils/common';

const Profile = ({ navigation, onGetAnotherUserClick, users, activeUserId }) => {
  const user = users.find(user => user.id === activeUserId);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, marginBottom: 20, marginTop: 50, textAlign: "center" }}>Информация о пользователе</Text>

      {user
        ? <View style={styles.card}>
        <View style={styles.headerWrapper}>
          <View style={styles.avatarWrapper}>
            <SvgUri width="100%" height="100%" uri={user.avatar}/>
          </View>
          <View style={styles.headerContent}>
            <View style={styles.nameWrapper}>
              <Text style={{ fontSize: 20 }}>{user.name}</Text>
            </View>
            <View style={styles.ratingWrapper}>
              <View style={styles.rateItem}>
                <Text style={{ fontSize: 32 }}>128</Text>
                <Text>Рейтинг</Text>
              </View>
              <View style={styles.rateItem}>
                <Text style={{ fontSize: 32 }}>2</Text>
                <Text>Место</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bodyWrapper}/>
      </View>
        : <Text>Loading...</Text>}

      <Button
        title="Сгенерировать пользователя"
        onPress={onGetAnotherUserClick(getRandomArrayItem(users).id)}
      />
      <Button
        title="Вернуться на главную"
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  users: getUsers(state),
  activeUserId: getActiveUserId(state),
});

const mapDispatchToProps = dispatch => ({
  onGetAnotherUserClick(id) {
    return () => dispatch(setUserId(id))
  }
});

export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
