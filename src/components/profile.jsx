import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Button, Image} from 'react-native';
import { SvgUri } from 'react-native-svg';

const getRandomInt = (min = 0, max = 0) => Math.floor(Math.random() * max) + min;

const getData = async () => {
  const users = await fetch('https://damp-fortress-80739.herokuapp.com/user');
  const { body } = await users.json();
  return body;
}

const Profile = ({ navigation, route }) => {
  let { itemId } = route.params;

  // todo переписать все на редакс
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData().then((users) => {
      setUsers(users);
      !user && setUser(users[itemId]);
    });
  }, [users, user, itemId])

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
        onPress={() => setUser(users[getRandomInt(0, 29)])}
      />
      <Button
        title="Вернуться на главную"
        onPress={() => navigation.navigate('MainScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  nameWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  ratingWrapper: {
    flex: 1,
    flexGrow: 2,
    flexDirection: 'row',
  },
  headerContent: {
    flex: 1,
    flexGrow: 2,
    flexDirection: 'column',
  },
  avatarWrapper: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    // backgroundColor: "grey"
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    borderColor: 'red',
    alignItems: 'center',
    flexGrow: 1,
  },
  bodyWrapper: {
    flex: 1,
    flexGrow: 4,
    borderColor: 'green'
  },
  rateItem: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Profile;
