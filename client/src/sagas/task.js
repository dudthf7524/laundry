import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    TASK_REGISTER_REQUEST,
    TASK_REGISTER_SUCCESS,
    TASK_REGISTER_FAILURE,

    TASK_NEW_ONE_REQUEST,
    TASK_NEW_ONE_SUCCESS,
    TASK_NEW_ONE_FAILURE,

    TASK_END_TIME_REQUEST,
    TASK_END_TIME_SUCCESS,
    TASK_END_TIME_FAILURE,

} from "../reducers/task";

function* watchTaskRegister() {
    yield takeLatest(TASK_REGISTER_REQUEST, taskRegister);
}

function taskRegisterAPI(data) {

    return axios.post("/task/register", data);
}

function* taskRegister(action) {
    try {
        const result = yield call(taskRegisterAPI, action.data);
        yield put({
            type: TASK_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASK_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchTaskNewOne() {
    yield takeLatest(TASK_NEW_ONE_REQUEST, taskNewOne);
}

function taskNewOneAPI() {

    return axios.get("/task/new/one", );
}

function* taskNewOne() {
    try {
        const result = yield call(taskNewOneAPI, );
        if(result.data === "common"){
            window.location.href = "/";
            return;
        }
        yield put({
            type: TASK_NEW_ONE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASK_NEW_ONE_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchTaskEndTime() {
    yield takeLatest(TASK_END_TIME_REQUEST, taskkEndTime);
}

function taskEndTimeAPI() {

    return axios.post("/task/end/time", );
}

function* taskkEndTime() {
    try {
        const result = yield call(taskEndTimeAPI, );
        if(result.data === "common"){
            window.location.href = "/";
            return;
        }
        yield put({
            type: TASK_END_TIME_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASK_END_TIME_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* taskSaga() {
    yield all([fork(watchTaskRegister), fork(watchTaskNewOne),  fork(watchTaskEndTime)]);
}