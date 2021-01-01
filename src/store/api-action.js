import { fetchUsers as fetchUsersSync } from './action';
import { addIds } from '../utils/common';

export const fetchUsers = () => (dispatch, _getState, api) => (
  api.get(`/user`)
    .then(({ data }) => dispatch(fetchUsersSync(addIds(data))))
    .catch((err) => console.log(err))
);
