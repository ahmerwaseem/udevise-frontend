import { createQuestionnaireFailure, createQuestionnairePending, createQuestionnaireSuccessful, 
  CREATE_QUESTIONNAIRE, GET_QUESTIONNAIRE_TO_TAKE, getQuestionnairePending, 
  getQuestionnaireSuccessful, getQuestionnaireFailure, 
  submitResponsePending, submitResponseSuccessful, submitResponseFailure, SUBMIT_RESPONSE, ERROR_OCCURRED,
  GET_ALL_QUESTIONNAIRES, getAllQuestionnairesPending, getAllQuestionnairesSuccessful, getAllQuestionnairesFailure, GET_DETAILS_BY_ID, getDetailsByIdSuccess, getResponseDetailsPending, getResponseDetailsFailure, getResponseDetailsSuccess, GET_RESPONSE_DETAIL } from "../actions/questionnaires";
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

function* getQuestionnaireForEndUser(action) {
  try {
    const token = yield select(getToken);
    yield put (getQuestionnairePending());
    let result = yield call(Axios.get,`/api/v1/questionnaire/${action.questionnaireType ? action.questionnaireType.toLowerCase() : "survey"}/${action.payload}`,null, config(token));
    console.log(result);
    yield put( getQuestionnaireSuccessful(result.data));
  } catch (e) {
    debugger;
    console.log(e.response,"error");
    let error;
    if (e.response && e.response.data && e.response.data.message){
      error = e.response.data.message;
    }
    yield put(getQuestionnaireFailure(error));
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

function* getDetails(action) {
  try {
    console.log(action.payload)
    const token = yield select(getToken);
    let result = yield call(Axios.get,`/api/v1/questionnaire/${action.payload}/detail`, config(token));
    yield put( getDetailsByIdSuccess(result.data));
  } catch (e) {
    alert("error");
  }
}

function* getResponseDetails(action) {
  try {
    console.log(action)
    yield put ( getResponseDetailsPending());
    const token = yield select(getToken);
    let result = yield call(Axios.get,`/api/v1/response/detail/${action.payload}/${action.responseId ? action.responseId : ""}`, config(token));
    yield put( getResponseDetailsSuccess(result.data));
  } catch (e) {
    yield put ( { type: ERROR_OCCURRED });
  }
}


export default function* questionnaireSaga() {
  yield takeEvery(CREATE_QUESTIONNAIRE, createQuestionnaire);
  yield takeEvery(GET_QUESTIONNAIRE_TO_TAKE, getQuestionnaireForEndUser);
  yield takeEvery(GET_ALL_QUESTIONNAIRES, getAllQuestionnaires);
  yield takeEvery(SUBMIT_RESPONSE, submitResponseForm);
  yield takeEvery(GET_DETAILS_BY_ID, getDetails);
  yield takeEvery(GET_RESPONSE_DETAIL, getResponseDetails)
}