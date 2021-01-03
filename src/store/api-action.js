import { fetchUsers as fetchUsersSync } from './action';
import { mockupUserData } from '../mocks/users-mockup';

export const fetchUsers = () => (dispatch, _getState, api) => (
  api.get(`/user`)
    .then(({ data }) => dispatch(fetchUsersSync(mockupUserData(data))))
    .catch((err) => console.log(err))
);
