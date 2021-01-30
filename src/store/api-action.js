import { fetchUsers as fetchUsersSync, fetchRegistrations as fetchRegistrationsSync, fetchUser as fetchUserSync, setCredentials, setError } from './action';
import { mockupUserData } from '../mocks/users-mockup';

const API_URL = `https://741067c7af3c.ngrok.io`;

export const fetchUsers = () => (dispatch, _getState, api) => (
  api.get(`https://damp-fortress-80739.herokuapp.com/user`)
    .then(({ data }) => dispatch(fetchUsersSync(mockupUserData(data))))
    .catch((err) => console.log(err))
);

export const login = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`${API_URL}/api/v1/user/login`, credentials)
      .then(({ data }) => dispatch(setCredentials(data)))
      .catch((err) => dispatch(setError(err)))
  );
};

export const register = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`${API_URL}/api/v1/user/register`, credentials)
      .then((res) => console.log(res))
      .catch((err) => dispatch(setError(err)))
  );
};

export const fetchUser = () => (dispatch, getState, api) => (
  api.get(`${API_URL}/api/v1/user/me`, {
    headers: { Authorization: getState().USER.token },
  })
    .then(({ data }) => dispatch(fetchUserSync(data)))
    .catch((err) => console.log(err))
);

export const fetchRegistrations = (date) => (dispatch, getState, api) => {
  return (
    api.get(`${API_URL}/api/v1/event/get/${date}`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => dispatch(fetchRegistrationsSync(data, date)))
      .catch((err) => console.log(err))
  );
};
