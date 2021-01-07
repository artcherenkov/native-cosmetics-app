export const ActionType = {
  FETCH_USERS: `FETCH_USERS`,
  SET_USER_ID: `SET_USER_ID`,
  SET_ACTIVE_DATE: `SET_ACTIVE_DATE`,
};

export const fetchUsers = (users) => ({
  type: ActionType.FETCH_USERS,
  payload: users,
});

export const setUserId = (userId) => ({
  type: ActionType.SET_USER_ID,
  payload: userId,
});

export const setActiveDate = (date) => ({
  type: ActionType.SET_ACTIVE_DATE,
  payload: date,
});
