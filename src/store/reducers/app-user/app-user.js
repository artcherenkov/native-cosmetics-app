import { ActionType } from '../../action';

export const AuthType = {
  REGISTER: `REGISTER`,
  LOGIN: `LOGIN`,
};

const initialState = {
  userId: null,
  token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDMwMTg2ODcsImlhdCI6MTYxMTQ4MjY4Nywic3ViIjoidGVzdGVyIn0.2seRQqoxISjuMG7XidzEUg68zd1ThB_-hcXCXa0E0Ao`,
  isLoggedIn: true,
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
