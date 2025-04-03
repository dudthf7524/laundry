import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    ATTENDANCESTART_REGISTER_REQUEST,
    ATTENDANCESTART_REGISTER_SUCCESS,
    ATTENDANCESTART_REGISTER_FAILURE,

    ATTENDANCESTART_NEW_ONE_REQUEST,
    ATTENDANCESTART_NEW_ONE_SUCCESS,
    ATTENDANCESTART_NEW_ONE_FAILURE,

    ATTENDANCESTART_DATE_REQUEST,
    ATTENDANCESTART_DATE_SUCCESS,
    ATTENDANCESTART_DATE_FAILURE,

    ATTENDANCESTART_MONTH_REQUEST,
    ATTENDANCESTART_MONTH_SUCCESS,
    ATTENDANCESTART_MONTH_FAILURE,

    ATTENDANCESTART_YEAR_REQUEST,
    ATTENDANCESTART_YEAR_SUCCESS,
    ATTENDANCESTART_YEAR_FAILURE,

    ATTENDANCESTART_TODAY_REQUEST,
    ATTENDANCESTART_TODAY_SUCCESS,
    ATTENDANCESTART_TODAY_FAILURE,

    ATTENDANCESTART_TODAY_ADMIN_REQUEST,
    ATTENDANCESTART_TODAY_ADMIN_SUCCESS,
    ATTENDANCESTART_TODAY_ADMIN_FAILURE,

    ATTENDANCESTART_UPDATE_REQUEST,
    ATTENDANCESTART_UPDATE_SUCCESS,
    ATTENDANCESTART_UPDATE_FAILURE,

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

function* watchAttendanceStartDate() {
    yield takeLatest(ATTENDANCESTART_DATE_REQUEST, attendanceStartDate);
}

function attendanceStartDateAPI(data) {

    return axios.post("/attendanceStart/date", data);
}

function* attendanceStartDate(action) {
    try {
        const result = yield call(attendanceStartDateAPI, action.data);

        yield put({
            type: ATTENDANCESTART_DATE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_DATE_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceStartMonth() {
    yield takeLatest(ATTENDANCESTART_MONTH_REQUEST, attendanceStartMonth);
}

function attendanceStartMonthAPI(data) {

    return axios.post("/attendanceStart/month", data);
}

function* attendanceStartMonth(action) {
    try {
        const result = yield call(attendanceStartMonthAPI, action.data);

        yield put({
            type: ATTENDANCESTART_MONTH_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_MONTH_FAILURE,
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

function* watchAttendanceStartToday() {
    yield takeLatest(ATTENDANCESTART_TODAY_REQUEST, attendanceStartToday);
}

function attendanceStartTodayAPI() {

    return axios.get("/attendanceStart/today");
}

function* attendanceStartToday() {
    try {
        const result = yield call(attendanceStartTodayAPI, );
        if (result.data === "common") {
            window.location.href = "/";
            return;
        }
        yield put({
            type: ATTENDANCESTART_TODAY_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_TODAY_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceStartTodayAdmin() {
    yield takeLatest(ATTENDANCESTART_TODAY_ADMIN_REQUEST, attendanceStartTodayAdmin);
}

function attendanceStartTodayAdminAPI() {

    return axios.get("/attendanceStart/today");
}

function* attendanceStartTodayAdmin() {
    try {
        const result = yield call(attendanceStartTodayAdminAPI, );
        if (result.data === "common") {
            window.location.href = "/";
            return;
        }
        yield put({
            type: ATTENDANCESTART_TODAY_ADMIN_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_TODAY_ADMIN_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchAttendanceStartUpdate() {
    yield takeLatest(ATTENDANCESTART_UPDATE_REQUEST, attendanceStartUpdate);
}

function attendanceStartUpdateAPI(data) {

    return axios.post("/attendanceStart/update", data);
}

function* attendanceStartUpdate(action) {
    try {
        const result = yield call(attendanceStartUpdateAPI, action.data );
        if (result.data) {
           alert('수정이 완료되었습니다.')
           window.location.href = "/admin/attendance";
           
        }
        yield put({
            type: ATTENDANCESTART_UPDATE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: ATTENDANCESTART_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* attendanceStartSaga() {
    yield all([
        fork(watchAttendanceStartRegister),
        fork(watchAttendanceStartNewOne),
        fork(watchAttendanceStartYear),
        fork(watchAttendanceStartMonth),
        fork(watchAttendanceStartDate),
        fork(watchAttendanceStartToday),
        fork(watchAttendanceStartUpdate),
        fork(watchAttendanceStartTodayAdmin),
    ]);
}