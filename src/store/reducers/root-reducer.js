import { combineReducers } from 'redux';
import { appStore } from './app-store/app-store';
import { appState } from './app-state/app-state';
import { appUser } from './app-user/app-user';

export const Namespace = {
  STORE: `STORE`,
  STATE: `STATE`,
  USER: `USER`,
};

export default combineReducers({
  [Namespace.STORE]: appStore,
  [Namespace.STATE]: appState,
  [Namespace.USER]: appUser,
});
