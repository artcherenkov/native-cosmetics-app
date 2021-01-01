import {StyleSheet} from 'react-native';

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

export default styles;
