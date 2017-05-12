import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const defaultState = {
  app: {
    data: {},
  },
};

const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(
    applyMiddleware(
      thunk,
    ),
  ),
);

export default store;
