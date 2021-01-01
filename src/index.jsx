import {registerRootComponent} from 'expo';
import React from 'react';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './store/reducers/root-reducer';
import {createAPI} from './services/api';
import App from './components/app';

const api = createAPI();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerRootComponent(Index);
