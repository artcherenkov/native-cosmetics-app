import {registerRootComponent} from 'expo';
import React from 'react';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './store/reducers/root-reducer';
import {createAPI} from './services/api';
import App from './components/app';
import {fetchUsers} from './store/api-action';

const api = createAPI();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(fetchUsers());

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Index);
