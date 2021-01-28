import { ActionType } from '../../action';
import { getRandomArrayItem } from '../../../utils/common';
import { adaptServicesToClient } from "../../../core/adapter/services";
import { rawServices } from "../../../data/services";

const initialState = {
  users: [],
  activeUserId: null,
  services: {},
  rawServices: {},
  user: null,
  availableServices: JSON.parse(rawServices).data.map((item) => ({ label: item.title, value: item.title })),
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_USERS: {
      return { ...state, users: action.payload, activeUserId: getRandomArrayItem(action.payload).id };
    }
    case ActionType.SET_USER_ID: {
      return { ...state, activeUserId: action.payload };
    }
    case ActionType.FETCH_USER: {
      return { ...state, user: action.payload };
    }
    case ActionType.FETCH_SERVICES: {
      console.log(action.payload);
      const { services, date } = action.payload;
      return {
        ...state,
        rawServices: { ...state.rawServices, [date]: services },
        services: { ...state.services, [date]: adaptServicesToClient(services) },
      };
    }
    default:
      return state;
  }
};

export { appStore };
