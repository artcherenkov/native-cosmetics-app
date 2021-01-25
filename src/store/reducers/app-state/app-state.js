import { ActionType } from '../../action';
import moment from 'moment';

const Error = {
  INTERNAL: `Внутренняя ошибка сервера, уже фиксим`,
  USER_DOESNT_EXIST: `Пользователя не существует`,
  WRONG_PASSWORD: `Неверный пароль`,
  PASSWORD_DIDNT_MATCH: `Пароли не совпадают`,
  LOGIN_ALREADY_EXISTS: `Пользователь с таким именем уже существует`,
  WRONG_BRANCH_OR_ID: `Неверный ID работника или предприятия`,
};

const initialState = {
  activeDate: moment(),
  isLoading: false,
  error: null,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_DATE: {
      return { ...state, activeDate: moment(action.payload) };
    }
    case ActionType.SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ActionType.SET_ERROR: {
      if (!action.payload) {
        return { ...state, error: null };
      }

      const error = action.payload;
      const { status } = error.response;
      const { data } = error.response;
      const message = `Произошла неизвестная ошибка`;

      if (status >= 500) {
        return { ...state, error: Error.INTERNAL };
      }

      if (!Error[data.error]) {
        return { ...state, error: message };
      }

      return { ...state, error: Error[data.error] };
    }
    default:
      return state;
  }
};

export { appState };
