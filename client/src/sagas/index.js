import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import authSaga from "./auth";
import timeSaga from "./time";
import processSaga from "./process";
import userProcessSaga from "./userProcess";
import taskSaga from "./task";


import { API_URL } from "../constants";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(authSaga),
    fork(timeSaga),
    fork(processSaga),
    fork(userProcessSaga),
    fork(taskSaga),
  ]);
}