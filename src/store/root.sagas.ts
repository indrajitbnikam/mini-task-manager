import { all, call } from "redux-saga/effects";
import tasksSagas from "./tasks/tasks.sagas";

export default function* rootSagas() {
  yield all([
    call(tasksSagas)
  ]);
}