export const ActionType = {
  FETCH_USERS: `FETCH_USERS`,
  SET_USER_ID: `SET_USER_ID`,
  SET_ACTIVE_DATE: `SET_ACTIVE_DATE`,
  SET_CREDENTIALS: `SET_CREDENTIALS`,
  TOGGLE_AUTH_STATUS: `TOGGLE_AUTH_STATUS`,
  TOGGLE_AUTH_TYPE: `TOGGLE_AUTH_TYPE`,
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

export const setCredentials = (credentials) => ({
  type: ActionType.SET_CREDENTIALS,
  payload: credentials,
});

export const toggleAuthStatus = () => ({
  type: ActionType.TOGGLE_AUTH_STATUS,
});

export const toggleAuthType = () => ({
  type: ActionType.TOGGLE_AUTH_TYPE,
});
