import { createQuestionnaireFailure, createQuestionnairePending, createQuestionnaireSuccessful, CREATE_QUESTIONNAIRE } from "../actions/questionnaires";
import { takeEvery, call, put } from 'redux-saga/effects'
import Axios from "axios";

let token = localStorage.getItem("token");
let config = {
  headers: {'Authorization': "bearer " + token}
};


function* createQuestionnaire(action) {
  const { questionnaire } = action;
  try {
    yield put (createQuestionnairePending());
    let result = yield call(Axios.post,"/api/v1/questionnaire",questionnaire, config);
    yield put( createQuestionnaireSuccessful(result.data.id) );
  } catch (e) {
    console.log(e,"error");
    yield put(createQuestionnaireFailure());
  }
}

export default function* questionnaireSaga() {
  yield takeEvery(CREATE_QUESTIONNAIRE, createQuestionnaire);
}