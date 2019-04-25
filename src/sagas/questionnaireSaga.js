import { createQuestionnaireFailure, createQuestionnairePending, createQuestionnaireSuccessful, 
  CREATE_QUESTIONNAIRE, GET_QUESTIONNAIRE_TO_TAKE, getQuestionnairePending, 
  getQuestionnaireSuccessful, getQuestionnaireFailure, 
  submitResponsePending, submitResponseSuccessful, submitResponseFailure, SUBMIT_RESPONSE, ERROR_OCCURRED,
  GET_ALL_QUESTIONNAIRES, getAllQuestionnairesPending, getAllQuestionnairesSuccessful, 
  getAllQuestionnairesFailure, GET_DETAILS_BY_ID, getDetailsByIdSuccess, 
  getResponseDetailsPending, getResponseDetailsFailure, 
  getResponseDetailsSuccess, GET_RESPONSE_DETAIL,
  GRADE_QUIZ, gradeQuizPending, gradeQuizSuccess, GET_REPORT

} from "../actions/questionnaires";
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
    yield put(createQuestionnaireFailure());
  }
}

function* getQuestionnaireForEndUser(action) {
  try {
    const token = yield select(getToken);
    yield put (getQuestionnairePending());
    let result = yield call(Axios.get,`/api/v1/questionnaire/${action.questionnaireType ? action.questionnaireType.toLowerCase() : "survey"}/${action.payload}`,null, config(token));
    yield put( getQuestionnaireSuccessful(result.data));
  } catch (e) {
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
    yield put(getAllQuestionnairesFailure());
  }
}


function* submitResponseForm(action) {
  try {
    yield put (submitResponsePending());
    const token = yield select(getToken);
    let result = yield call(Axios.post,"/api/v1/response",action.payload, config(token));
    yield put( submitResponseSuccessful(result.data));
  } catch (e) {
    yield put(submitResponseFailure());
  }
}

function* getDetails(action) {
  try {
    const token = yield select(getToken);
    let result = yield call(Axios.get,`/api/v1/questionnaire/${action.payload}/detail`, config(token));
    yield put( getDetailsByIdSuccess(result.data));
  } catch (e) {
    alert("error");
  }
}

function* getResponseDetails(action) {
  try {
    yield put ( getResponseDetailsPending());
    const token = yield select(getToken);
    let result = yield call(Axios.get,`/api/v1/response/detail/${action.payload}/${action.responseId ? action.responseId : ""}`, config(token));
    yield put( getResponseDetailsSuccess(result.data));
  } catch (e) {
    yield put ( { type: ERROR_OCCURRED });
  }
}

function* gradeQuiz(action) {
  try {
    yield put ( gradeQuizPending() ) ;
    const token = yield select(getToken);
    let result = yield call(Axios.put,`/api/v1/response/grade/${action.questionnaireId}/${action.responseId}`, action.payload, config(token));
    yield put( gradeQuizSuccess() );
  } catch (e) {
    yield put ( { type: ERROR_OCCURRED });
  }
}

// function* getReport(action) {
//   try {
//     const token = yield select(getToken);
//     let result = yield call(Axios.put,`/api/v1/response/${action.questionnaireId}/report`, config(token));
//     yield put( getReportSuccess(result.data) );
//   } catch (e) {
//     yield put ( { type: ERROR_OCCURRED });
//   }
// }



export default function* questionnaireSaga() {
  yield takeEvery(CREATE_QUESTIONNAIRE, createQuestionnaire);
  yield takeEvery(GET_QUESTIONNAIRE_TO_TAKE, getQuestionnaireForEndUser);
  yield takeEvery(GET_ALL_QUESTIONNAIRES, getAllQuestionnaires);
  yield takeEvery(SUBMIT_RESPONSE, submitResponseForm);
  yield takeEvery(GET_DETAILS_BY_ID, getDetails);
  yield takeEvery(GET_RESPONSE_DETAIL, getResponseDetails);
  yield takeEvery(GRADE_QUIZ, gradeQuiz);
  // yield takeEvery(GET_REPORT, getReport);

}