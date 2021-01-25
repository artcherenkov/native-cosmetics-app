import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View, Text, Button, FlatList, Image } from 'react-native';

import styles from './styles';

import { getActiveUserId, getUsers } from '../../../store/reducers/app-store/selectors';
import { setLoading, setUserId } from '../../../store/action';
import { getRandomInt } from '../../../utils/common';

import userProp from '../../../types/user.prop';
import { fetchUser } from "../../../store/api-action";
import Loading from "../../ui/loading/loading";

const renderRole = ({ item }) => (
    <Text style={styles.role}>
      {`\t`}{item.id}. {item.role}
    </Text>
);

const Profile = ({ navigation, user, fetchUserData, isLoggedIn, isLoading }) => {
  const { avatar, branch, city, id_branch: branchId, id_ycl: yclId, leader, login, name, role } = user || {};

  useEffect(() => {
    fetchUserData();
  }, [isLoggedIn]);

  return (
      <View style={styles.container}>
        {isLoading
          ? <Loading />
          : <View style={styles.card}>
              <View style={styles.headerWrapper}>
                <View style={styles.avatarWrapper}>
                  <Image style={styles.avatar} source={{ uri: avatar }} />
                </View>
                <View style={styles.headerContent}>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.login}>Логин: {login}</Text>
                  </View>
                  <View style={styles.ratingWrapper}>
                    <View style={styles.rateItem}>
                      <Text style={styles.rating}>{user.rating || `...`}</Text>
                      <Text>Рейтинг</Text>
                    </View>
                    <View style={styles.rateItem}>
                      <Text style={styles.place}>{user.place || `...`}</Text>
                      <Text>Место</Text>
                    </View>
                  </View>
                  <Button title="Перейти к рейтингу" onPress={() => navigation.navigate(`Rating`)}/>
                </View>
              </View>
              <View style={styles.bodyWrapper}>
                <View>
                  <Text style={styles.userInfoTitle}>Город:</Text>
                  <Text style={styles.userInfo}>{`\t` + city}</Text>
                </View>
                <View>
                  <Text style={styles.userInfoTitle}>Филиал:</Text>
                  <Text style={styles.userInfo}>{`\t` + branch}</Text>
                </View>
                <View>
                  <Text style={styles.userInfoTitle}>Должность:</Text>
                  <Text style={styles.userInfo}>{`\t` + role}</Text>
                </View>
                <View>
                  <Text style={styles.userInfoTitle}>Начальник:</Text>
                  <Text style={styles.userInfo}>{`\t` + leader}</Text>
                </View>
                <View>
                  <Text style={styles.userInfoTitle}>ID филиала:</Text>
                  <Text style={styles.userInfo}>{`\t` + branchId}</Text>
                </View>
                <View>
                  <Text style={styles.userInfoTitle}>ID работника из YClients:</Text>
                  <Text style={styles.userInfo}>{`\t` + yclId}</Text>
                </View>
              </View>
            </View>}
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
  isLoggedIn: state.USER.isLoggedIn,
  isLoading: state.STATE.isLoading,
  user: state.STORE.user,
});

const mapDispatchToProps = dispatch => ({
  onGetAnotherUserClick(users) {
    return () => dispatch(setUserId(getRandomInt(0, users.length - 1)));
  },
  fetchUserData() {
    dispatch(setLoading(true));
    dispatch(fetchUser())
      .then(() => dispatch(setLoading(false)));
  },
});

export { Profile };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
