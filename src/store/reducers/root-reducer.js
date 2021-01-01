import { combineReducers } from 'redux';
import { appStore } from './app-store/app-store';
import { appState } from './app-state/app-state';

export const Namespace = {
  STORE: `STORE`,
  STATE: `STATE`,
};

export default combineReducers({
  [Namespace.STORE]: appStore,
  [Namespace.STATE]: appState,
});
