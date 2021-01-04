import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, FlatList, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { getUsers } from '../../store/reducers/app-store/selectors';
import userProp from '../../types/user.prop';

const Place = {
  1: `#f5c22e`,
  2: `#c0c0c0`,
  3: `#cd7f32`,
};

const renderMedal = (place) => <View style={{ marginRight: 5 }}>
  <FontAwesome5 name="medal" color={Place[place]} size={20} />
</View>;

const renderItem = ({ item, index }) => {
  return (<View style={{ flex: 1, flexDirection: `row`, justifyContent: `space-between`, alignItems: `center`, paddingRight: 10, marginBottom: 20 }}>
    <View style={{ fontSize: 16, width: 50, flexDirection: `row`, alignItems: `center` }}>
      {index < 3 && renderMedal(index + 1)}
      <Text style={{ textAlign: `center` }}>
        {index + 1}
      </Text>
    </View>
    <View style={{ flex: 1, flexDirection: `row`, alignItems: `center` }}>
      <View style={{ width: 40, height: 40, marginRight: 10, borderRadius: 40 / 2, backgroundColor: `rgb(101, 201, 255)` }}>
          <SvgUri width="100%" height="100%" uri={item.avatar} />
        {/* <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40 }} /> */}
      </View>
      <Text style={{ fontSize: 16, textAlign: `left`, flexGrow: 1 }}>{item.name}</Text>
    </View>
    <Text style={{ fontSize: 16, width: 70, textAlign: `center` }}>{item.rating}</Text>
  </View>);
};

const Header = () => (
  <View style={{ flex: 1, flexDirection: `row`, backgroundColor: `rgb(242, 242, 242)`, justifyContent: `space-between`, paddingRight: 10, paddingVertical: 10 }}>
    <Text style={{ fontSize: 16, width: 50 }}>Место</Text>
    <Text style={{ fontSize: 16 }}>Имя</Text>
    <Text style={{ fontSize: 16, width: 70, textAlign: `center` }}>Рейтинг</Text>
  </View>
);

const Rating = ({ navigation, users }) => {
  return (
    <View style={{ flex: 1, marginLeft: 20 }}>
      <FlatList
        ListHeaderComponent={Header}
        data={users}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

Rating.propTypes = {
  navigation: PropTypes.any.isRequired,
  users: PropTypes.arrayOf(userProp).isRequired,
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

export { Rating };
export default connect(mapStateToProps, null)(Rating);
