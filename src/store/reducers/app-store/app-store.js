import { ActionType } from '../../action';
import { getRandomArrayItem } from '../../../utils/common';

const initialState = {
  users: [],
  activeUserId: null,
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_USERS: {
      return {...state, users: action.payload, activeUserId: getRandomArrayItem(action.payload)}
    }
    case ActionType.SET_USER_ID: {
      return {...state, activeUserId: action.payload}
    }
    default:
      return state;
  }
};

export { appStore };
