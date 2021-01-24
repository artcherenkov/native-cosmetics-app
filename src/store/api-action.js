import { fetchUsers as fetchUsersSync, setCredentials, setError } from './action';
import { mockupUserData } from '../mocks/users-mockup';

export const fetchUsers = () => (dispatch, _getState, api) => (
  api.get(`https://damp-fortress-80739.herokuapp.com/user`)
    .then(({ data }) => dispatch(fetchUsersSync(mockupUserData(data))))
    .catch((err) => console.log(err))
);

export const login = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`https://c6492be7fc46.ngrok.io/api/v1/user/login`, credentials)
      .then(({ data }) => dispatch(setCredentials(data)))
      .catch((err) => {
        console.log(err);
        dispatch(setError(err));
      })
  );
};

export const register = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`https://c6492be7fc46.ngrok.io/api/v1/user/register`, credentials)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  );
};
