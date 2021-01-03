import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexGrow: 1,
    alignSelf: `stretch`,
    marginHorizontal: 20,
  },
  nameWrapper: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    flexGrow: 1,
  },
  ratingWrapper: {
    flex: 1,
    flexGrow: 2,
    flexDirection: `row`,
  },
  headerContent: {
    flex: 1,
    flexGrow: 2,
    flexDirection: `column`,
    justifyContent: `space-between`,
  },
  avatarWrapper: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: `rgb(242, 242, 242)`,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: `row`,
    borderColor: `red`,
    alignItems: `center`,
    flexGrow: 1,
  },
  bodyWrapper: {
    flex: 1,
    flexGrow: 3,
    marginTop: 30,
    borderColor: `green`,
  },
  rateItem: {
    flexGrow: 1,
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default styles;
