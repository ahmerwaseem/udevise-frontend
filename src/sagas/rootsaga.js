import questionnaireSaga from "./questionnaireSaga";
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([
    questionnaireSaga()
  ])
}