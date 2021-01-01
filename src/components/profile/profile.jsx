import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

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
            {/*<SvgUri width="100%" height="100%" uri={user.avatar}/>*/}
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

export default Profile;
