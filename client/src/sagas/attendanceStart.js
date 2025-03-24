import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    ATTENDANCESTART_REGISTER_REQUEST,
    ATTENDANCESTART_REGISTER_SUCCESS,
    ATTENDANCESTART_REGISTER_FAILURE,

    ATTENDANCESTART_NEW_ONE_REQUEST,
    ATTENDANCESTART_NEW_ONE_SUCCESS,
    ATTENDANCESTART_NEW_ONE_FAILURE,

    ATTENDANCESTART_YEAR_REQUEST,
    ATTENDANCESTART_YEAR_SUCCESS,
    ATTENDANCESTART_YEAR_FAILURE,

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


function* watchAttendanceStartYear() {
    yield takeLatest(ATTENDANCESTART_YEAR_REQUEST, attendanceStartYear);
}

function attendanceStartYearAPI(data) {

    return axios.post("/attendanceStart/year", data);
}

function* attendanceStartYear(action) {
    try {
        const result = yield call(attendanceStartYearAPI, action.data);
       
        yield put({
            type: ATTENDANCESTART_YEAR_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_YEAR_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* attendanceStartSaga() {
    yield all([fork(watchAttendanceStartRegister), fork(watchAttendanceStartNewOne), fork(watchAttendanceStartYear)]);
}