import { ActionType } from '../../action';
import moment from 'moment';

const initialState = {
  activeDate: moment(),
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_DATE: {
      return { ...state, activeDate: moment(action.payload) };
    }
    default:
      return state;
  }
};

export { appState };
