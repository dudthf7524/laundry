import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    ATTENDANCESTART_REGISTER_REQUEST,
    ATTENDANCESTART_REGISTER_SUCCESS,
    ATTENDANCESTART_REGISTER_FAILURE,

    ATTENDANCESTART_NEW_ONE_REQUEST,
    ATTENDANCESTART_NEW_ONE_SUCCESS,
    ATTENDANCESTART_NEW_ONE_FAILURE,

    WORK_END_TIME_REQUEST,
    WORK_END_TIME_SUCCESS,
    WORK_END_TIME_FAILURE,

} from "../reducers/attendanceStart";

function* watchAttendanceStartRegister() {
    yield takeLatest(ATTENDANCESTART_REGISTER_REQUEST, attendanceStartRegister);
}

function attendanceStartRegisterAPI(data) {

    return axios.post("/attendanceStart/register", data);
}

function* attendanceStartRegister(action) {
    try {
        const result = yield call(attendanceStartRegisterAPI, action.data);

        if (result.data === 'common') {
            alert('로그인이 필요합니다.')
            window.location.href = "/";
        }

        if (result.data) {
            window.location.href = "/attendance";
        }
        yield put({
            type: ATTENDANCESTART_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchAttendanceStartNewOne() {
    yield takeLatest(ATTENDANCESTART_NEW_ONE_REQUEST, attendanceStartNewOne);
}

function attendanceStartNewOneAPI() {

    return axios.get("/attendanceStart/new/one",);
}

function* attendanceStartNewOne() {
    try {
        const result = yield call(attendanceStartNewOneAPI,);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        }
        yield put({
            type: ATTENDANCESTART_NEW_ONE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_NEW_ONE_FAILURE,
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
        } else if (result.data) {
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



export default function* attendanceStartSaga() {
    yield all([fork(watchAttendanceStartRegister), fork(watchAttendanceStartNewOne), fork(watchWorkEndTime)]);
}