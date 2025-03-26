import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    TASKSTART_REGISTER_REQUEST,
    TASKSTART_REGISTER_SUCCESS,
    TASKSTART_REGISTER_FAILURE,

    TASKSTART_NEW_ONE_REQUEST,
    TASKSTART_NEW_ONE_SUCCESS,
    TASKSTART_NEW_ONE_FAILURE,

    TASKSTART_DATE_REQUEST,
    TASKSTART_DATE_SUCCESS,
    TASKSTART_DATE_FAILURE,


} from "../reducers/taskStart";

function* watchTaskStartRegister() {
    yield takeLatest(TASKSTART_REGISTER_REQUEST, taskStartRegister);
}

function taskStartRegisterAPI(data) {

    return axios.post("/taskStart/register", data);
}

function* taskStartRegister(action) {
    try {
        const result = yield call(taskStartRegisterAPI, action.data);
        if (result.data) {
            window.location.href = "/task";
        }
        yield put({
            type: TASKSTART_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKSTART_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}



function* watchTaskStartNewOne() {
    yield takeLatest(TASKSTART_NEW_ONE_REQUEST, taskStartNewOne);
}

function taskStartNewOneAPI() {

    return axios.get("/taskStart/new/one",);
}

function* taskStartNewOne() {
    try {
        const result = yield call(taskStartNewOneAPI,);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        }
        yield put({
            type: TASKSTART_NEW_ONE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKSTART_NEW_ONE_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTaskStartDate() {
    yield takeLatest(TASKSTART_DATE_REQUEST, taskStartDate);
}

function taskStartDateAPI(data) {

    return axios.post("/taskStart/date", data);
}

function* taskStartDate(action) {
    try {
        const result = yield call(taskStartDateAPI, action.data);
       
        yield put({
            type: TASKSTART_DATE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKSTART_DATE_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* taskStartSaga() {
    yield all([fork(watchTaskStartRegister), fork(watchTaskStartNewOne), fork(watchTaskStartDate)]);
}