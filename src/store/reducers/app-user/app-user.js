import { ActionType } from '../../action';

export const AuthType = {
  REGISTER: `REGISTER`,
  LOGIN: `LOGIN`,
};

const initialState = {
  userId: null,
  token: null,
  isLoggedIn: false,
  authType: AuthType.LOGIN,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CREDENTIALS: {
      const { token } = action.payload;
      return { ...state, token, isLoggedIn: true };
    }
    case ActionType.TOGGLE_AUTH_STATUS: {
      return { ...state, isLoggedIn: action.payload || !state.isLoggedIn };
    }
    case ActionType.TOGGLE_AUTH_TYPE: {
      const currentType = state.authType;
      if (currentType === AuthType.REGISTER) {
        return { ...state, authType: AuthType.LOGIN };
      }

      return { ...state, authType: AuthType.REGISTER };
    }
    default:
      return state;
  }
};

export { appUser };
