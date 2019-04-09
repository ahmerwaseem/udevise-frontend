import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import { Router, Route, Switch } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootsaga';
import CreateQuestionnaire from './containers/CreateQuestionnaire/CreateQuestionnaire';
import requireAuth from './components/Authenticate/Authenticate';
import Callback from './containers/Callback/Callback';
import history from "./history";
import AnswerQuestionnaire from './containers/AnswerQuestionnaire/AnswerQuestionnaire'
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './utils/localStorage';
import Header from './components/Header/Header';
import Dashboard from './containers/Dashboard/Dashboard';

const persistedState = loadState();

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare)
  )
);

sagaMiddleWare.run(rootSaga);

store.subscribe(() => {
  saveState({
    user: store.getState().user
  });
});

ReactDOM.render(
 <Provider store={store}>
  <Router history={history}>
    <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/create" component={requireAuth(CreateQuestionnaire)} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route path="/answer/:id" component={AnswerQuestionnaire} />
          <Route path="/secure/answer/:id" component={requireAuth(AnswerQuestionnaire)} />
          <Route exact path="/callback" component={Callback} />
        </Switch>
    </div>
  </Router>
 </Provider>
, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
