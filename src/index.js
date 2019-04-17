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
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import MenuAppBar from './containers/MenuAppBar/MenuAppBar';
import QuestionnaireDetails from './containers/QuestionnaireDetails/QuestionnaireDetails';
import ResponseDetail from './containers/ResponseDetail/ResponseDetail';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';



const persistedState = loadState();

const theme = createMuiTheme({
      palette: {
        primary: { 500 : '#0F8CE0' },
      },
      typography: {
        fontFamily: [
          'Lato',
          'Roboto',
          '"Helvetica Neue"',
          'sans-serif',
        ].join(','),
      },
});

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
 <MuiThemeProvider theme={theme}>
  <Router history={history}>
    <div className="index">
        <Header/>
        <div className="wrapper">
        <Switch>
          <ErrorBoundary>
            <Route exact path="/" component={App} />
            {/* <Route path="/create" component={requireAuth(CreateQuestionnaire)} /> */}
            <Route path="/dashboard" component={requireAuth(Dashboard)} />
            <Route exact path="/survey/:id" component={AnswerQuestionnaire} />
            <Route exact path="/quiz/:id" component={requireAuth(AnswerQuestionnaire, { type: "QUIZ"})} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/detail/:id" component={requireAuth(QuestionnaireDetails)}/>
            <Route exact path="/create/survey"   component={requireAuth(CreateQuestionnaire, { type: "SURVEY", initialValues:{type:"SURVEY"}}) } />
            <Route exact path="/create/quiz"  component={requireAuth(CreateQuestionnaire, { type: "QUIZ", initialValues:{type:"QUIZ"}}) } />
            <Route exact path="/response/:id"  component={requireAuth(ResponseDetail) } />
            <Route exact path="/response/:id/:responseId"  component={requireAuth(ResponseDetail) } />
          </ErrorBoundary>
        </Switch>
        </div>
    </div>
  </Router>
  </MuiThemeProvider>
 </Provider>
, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
