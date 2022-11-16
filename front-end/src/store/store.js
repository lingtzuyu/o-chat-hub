import { composeWithDevTools } from 'redux-devtools-extension';
import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

// import reducer

import alertReducer from './reducers/alert_reducer';
import authReducer from './reducers/auth_reducer';
import friendReducer from './reducers/friend_reducer';
import chatReducer from './reducers/chat_reducer';
import cardReducer from './reducers/card_reducer';

// 想像成API route
const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  friends: friendReducer,
  chat: chatReducer,
  card: cardReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
