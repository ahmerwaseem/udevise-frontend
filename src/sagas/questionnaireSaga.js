import { createQuestionnaireFailure, createQuestionnairePending, createQuestionnaireSuccessful, 
  CREATE_QUESTIONNAIRE, GET_QUESTIONNAIRE_TO_TAKE, getQuestionnairePending, 
  getQuestionnaireSuccessful, getQuestionnaireFailure, 
  submitResponsePending, submitResponseSuccessful, submitResponseFailure, SUBMIT_RESPONSE, 
  GET_ALL_QUESTIONNAIRES, getAllQuestionnairesPending, getAllQuestionnairesSuccessful, getAllQuestionnairesFailure } from "../actions/questionnaires";
import { takeEvery, call, put, select } from 'redux-saga/effects'

import Axios from "axios";
import { config, getToken } from "../utils/userUtils";


function* createQuestionnaire(action) {
  const { questionnaire } = action;
  try {
    const token = yield select(getToken);
    yield put (createQuestionnairePending());
    let result = yield call(Axios.post,"/api/v1/questionnaire",questionnaire, config(token));
    yield put( createQuestionnaireSuccessful(result.data) );
  } catch (e) {
    console.log(e,"error");
    yield put(createQuestionnaireFailure());
  }
}

function* getQuestionnaire(action) {
  try {
    const token = yield select(getToken);
    yield put (getQuestionnairePending());
    let result = yield call(Axios.get,"/api/v1/questionnaire/"+ action.payload,null, config(token));
    console.log(result);
    yield put( getQuestionnaireSuccessful(result.data));
  } catch (e) {
    console.log(e,"error");
    yield put(getQuestionnaireFailure());
  }
}

//will get all created questionnaires by user token provided in header
function* getAllQuestionnaires() {
  try {
    const token = yield select(getToken);
    yield put (getAllQuestionnairesPending());
    let result = yield call(Axios.get,"/api/v1/questionnaire", config(token));
    yield put( getAllQuestionnairesSuccessful(result.data));
  } catch (e) {
    console.log(e,"error");
    yield put(getAllQuestionnairesFailure());
  }
}


function* submitResponseForm(action) {
  try {
    yield put (submitResponsePending());
    const token = yield select(getToken);
    let result = yield call(Axios.post,"/api/v1/response",action.payload, config(token));
    console.log(result);
    yield put( submitResponseSuccessful(result.data));
  } catch (e) {
    console.log(e,"error");
    yield put(submitResponseFailure());
  }
}


export default function* questionnaireSaga() {
  yield takeEvery(CREATE_QUESTIONNAIRE, createQuestionnaire);
  yield takeEvery(GET_QUESTIONNAIRE_TO_TAKE, getQuestionnaire);
  yield takeEvery(GET_ALL_QUESTIONNAIRES, getAllQuestionnaires);
  yield takeEvery(SUBMIT_RESPONSE, submitResponseForm);
}