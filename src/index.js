import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import './index.css';
import App from './App';
import reducers from './reducers/index';

const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
sagaMiddleware.run(rootSaga);
registerServiceWorker();
