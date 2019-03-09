import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import { Router, Route } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootsaga';
import CreateQuestionnaire from './containers/CreateQuestionnaire/CreateQuestionnaire';
import requireAuth from './components/Authenticate/Authenticate';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
//import { requiresAuth } from './Auth/Auth';
import history from "./history";
import AnswerQuestionnaire from './containers/AnswerQuestionnaire/AnswerQuestionnaire'
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleWare)
  )
);

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

sagaMiddleWare.run(rootSaga);

ReactDOM.render(
 <Provider store={store}>
  <Router history={history}>
    <div>
    <Route exact path="/" component={App} />
    <Route path="/create" component={requireAuth(CreateQuestionnaire)} />
    <Route path="/answer/:id" component={AnswerQuestionnaire} />
    <Route path="/secure/answer/:id" component={requireAuth(AnswerQuestionnaire)} />
    {/* <Route exact path="/callback" component={Callback} /> */}
    <Route exact path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
    }} />
    </div>
  </Router>
 </Provider>
, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
