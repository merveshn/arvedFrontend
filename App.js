import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import ArvedNavigation from './navigation/ArvedNavigation';
import authReducer from './store/reducers/authReducer';
import personelBilgileriReducer from './store/reducers/personelBilgileriReducer';
import makaleReducer from './store/reducers/makaleReducer';
import projeReducer from './store/reducers/projeReducer';
import onayReducer from './store/reducers/onayReducer';

LogBox.ignoreAllLogs();

const rootReducer = combineReducers({
  auth: authReducer,
  personelBilgileri: personelBilgileriReducer,
  makale: makaleReducer,
  proje: projeReducer,
  onay: onayReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
      <Provider store={store}>
        <StatusBar translucent={true} barStyle='dark-content' backgroundColor="transparent"/>
        <ArvedNavigation />
      </Provider>
  );
}
