import { ActionType } from '../../action';
import { getRandomArrayItem } from '../../../utils/common';
import { adaptServicesToClient } from "../../../core/adapter/services";
import { rawServices } from "../../../data/services";

const initialState = {
  users: [],
  activeUserId: null,
  registrations: {},
  rawRegistrations: {},
  user: null,
  services: JSON.parse(rawServices).data.map((item) => ({ title: item.title, id: item.salon_service_id })),
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
    case ActionType.FETCH_REGISTRATIONS: {
      console.log(action.payload);
      const { registrations, date } = action.payload;
      return {
        ...state,
        rawRegistrations: { ...state.rawRegistrations, [date]: registrations },
        registrations: { ...state.registrations, [date]: adaptServicesToClient(registrations) },
      };
    }
    default:
      return state;
  }
};

export { appStore };
