
import {
  GET_USER_SUBMITTED,
  getUserSubmittedPending,
  getUserSubmittedFailure,
  getUserSubmittedSuccess
} from "../actions/user";

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
  }
}

export default function* userSaga(){
  yield takeEvery(GET_USER_SUBMITTED,getUserSubmissions)
}