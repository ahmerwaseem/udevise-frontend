
import {
  GET_USER_SUBMITTED,
  getUserSubmittedPending,
  getUserSubmittedFailure,
  getUserSubmittedSuccess,
  SAVE_USER,
} from "../actions/user";

import {
  ERROR_OCCURRED
} from "../actions/questionnaires";

import { getErrorMessage } from "../utils/errorHelper";


import { takeEvery, call, put, select } from 'redux-saga/effects'
import Axios from "axios";
import { config, getToken } from "../utils/userUtils";

function* getUserSubmissions() {
  try{
    const token = yield select(getToken);
    yield put(getUserSubmittedPending());
    let result = yield call(Axios.get,"/api/v1/user/responses", config(token))
    yield put (getUserSubmittedSuccess(result.data))
  } catch (e) {
    yield put(getUserSubmittedFailure());
    yield put ( { type: ERROR_OCCURRED , payload: getErrorMessage(e) });
  }
}

function* saveUser(action) {
  try{
    yield call(Axios.post,"/api/v1/user",action.payload); 
  } catch (e) {
    yield put ( { type: ERROR_OCCURRED , payload: getErrorMessage(e) });
  }
}

export default function* userSaga(){
  yield takeEvery(GET_USER_SUBMITTED,getUserSubmissions)
  yield takeEvery(SAVE_USER, saveUser);
}