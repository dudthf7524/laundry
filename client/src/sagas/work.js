import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    WORK_REGISTER_REQUEST,
    WORK_REGISTER_SUCCESS,
    WORK_REGISTER_FAILURE,

    WORK_NEW_ONE_REQUEST,
    WORK_NEW_ONE_SUCCESS,
    WORK_NEW_ONE_FAILURE,

    WORK_END_TIME_REQUEST,
    WORK_END_TIME_SUCCESS,
    WORK_END_TIME_FAILURE,

} from "../reducers/work";

function* watchWorkRegister() {
    yield takeLatest(WORK_REGISTER_REQUEST, workRegister);
}

function workRegisterAPI(data) {

    return axios.post("/work/register", data);
}

function* workRegister(action) {
    try {
        const result = yield call(workRegisterAPI, action.data);
        if (result.data) {
            window.location.href = "/attendance";
        }
        yield put({
            type: WORK_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchWorkNewOne() {
    yield takeLatest(WORK_NEW_ONE_REQUEST, workNewOne);
}

function workNewOneAPI() {

    return axios.get("/work/new/one",);
}

function* workNewOne() {
    try {
        const result = yield call(workNewOneAPI,);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        }
        yield put({
            type: WORK_NEW_ONE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_NEW_ONE_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchWorkEndTime() {
    yield takeLatest(WORK_END_TIME_REQUEST, workkEndTime);
}

function workEndTimeAPI(data) {

    return axios.post("/work/end/time", data);
}

function* workkEndTime(action) {
    try {
        const result = yield call(workEndTimeAPI, action.data);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        }else if(result.data){
            window.location.href = "/attendance"
        }
        
        yield put({
            type: WORK_END_TIME_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORK_END_TIME_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* workSaga() {
    yield all([fork(watchWorkRegister), fork(watchWorkNewOne), fork(watchWorkEndTime)]);
}