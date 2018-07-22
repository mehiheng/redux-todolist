import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './contianer/container';
import './index.css';
import counter from './reducers';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(counter);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);
registerServiceWorker();
