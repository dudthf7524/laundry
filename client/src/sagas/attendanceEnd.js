import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    ATTENDANCEEND_TIME_REQUEST,
    ATTENDANCEEND_TIME_SUCCESS,
    ATTENDANCEEND_TIME_FAILURE,

    ATTENDANCEEND_TIME_ADMIN_REQUEST,
    ATTENDANCEEND_TIME_ADMIN_SUCCESS,
    ATTENDANCEEND_TIME_ADMIN_FAILURE,

} from "../reducers/attendanceEnd";



function* watchAttendanceEndRegister() {
    yield takeLatest(ATTENDANCEEND_TIME_REQUEST, attendanceEndRegister);
}

function attendanceEndRegisterAPI(data) {

    return axios.post("/attendanceEnd/register", data);
}

function* attendanceEndRegister(action) {
    try {
        const result = yield call(attendanceEndRegisterAPI, action.data);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        } else if (result.data) {
            window.location.href = "/attendance"
        }

        yield put({
            type: ATTENDANCEEND_TIME_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCEEND_TIME_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchAttendanceEndAdminRegister() {
    yield takeLatest(ATTENDANCEEND_TIME_ADMIN_REQUEST, attendanceEndAdminRegister);
}

function attendanceEndAdminRegisterAPI(data) {

    return axios.post("/attendanceEnd/admin/register", data);
}

function* attendanceEndAdminRegister(action) {
    try {
        const result = yield call(attendanceEndAdminRegisterAPI, action.data);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        } else if (result.data) {
            window.location.href = "/admin/attendance"
        }

        yield put({
            type: ATTENDANCEEND_TIME_ADMIN_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCEEND_TIME_ADMIN_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* attendanceEndSaga() {
    yield all([fork(watchAttendanceEndRegister), fork(watchAttendanceEndAdminRegister)]);
}