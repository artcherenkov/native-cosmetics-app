import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    marginTop: 20,
  },
  card: {
    flex: 1,
    flexGrow: 1,
    alignSelf: `stretch`,
    marginHorizontal: 20,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: `row`,
    borderColor: `red`,
    alignItems: `center`,
    flexGrow: 1,
  },
  avatarWrapper: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: `rgb(242, 242, 242)`,
  },
  headerContent: {
    flex: 1,
    flexGrow: 2,
    flexDirection: `column`,
    justifyContent: `space-between`,
  },
  nameWrapper: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    flexGrow: 1,
  },
  name: {
    fontSize: 26,
  },
  ratingWrapper: {
    flex: 1,
    flexGrow: 2,
    flexDirection: `row`,
  },
  rateItem: {
    flexGrow: 1,
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  rating: {
    fontSize: 28,
  },
  place: {
    fontSize: 28,
  },
  bodyWrapper: {
    flex: 1,
    flexGrow: 3,
    marginTop: 30,
    borderColor: `green`,
  },
  userInfo: {
    marginBottom: 20,
    fontSize: 18,
  },
  role: {
    marginBottom: 20,
    fontSize: 16,
  },
});

export default styles;
