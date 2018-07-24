import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './contianer/container';
import './index.css';
import counter from './reducers';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const store = createStore(counter);
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/:status" component={App} />
      </div>
    </Router>
  </Provider>,
  rootEl
);
registerServiceWorker();
