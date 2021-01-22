import { fetchUsers as fetchUsersSync } from './action';
import { mockupUserData } from '../mocks/users-mockup';

export const fetchUsers = () => (dispatch, _getState, api) => (
  api.get(`https://damp-fortress-80739.herokuapp.com/user`)
    .then(({ data }) => dispatch(fetchUsersSync(mockupUserData(data))))
    .catch((err) => console.log(err))
);

export const auth = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`https://f7bbb4410ea9.ngrok.io/api/v1/user/login`, credentials)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  );
};

export const register = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`https://f7bbb4410ea9.ngrok.io/api/v1/user/register`, credentials)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  );
};
