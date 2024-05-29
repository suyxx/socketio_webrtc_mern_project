import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
import friendsReducer from './reducers/friendsReducer';
import chatReducer from './reducers/chatReducer';
import roomReducer from './reducers/roomReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: 'development', // Enable Redux DevTools extension in development
});

export default store;
