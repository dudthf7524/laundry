import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    TODAY_ATTENDANCE_REQUEST,
    TODAY_ATTENDANCE_SUCCESS,
    TODAY_ATTENDANCE_FAILURE,

    TODAY_TASK_REQUEST,
    TODAY_TASK_SUCCESS,
    TODAY_TASK_FAILURE,

} from "../reducers/today";

function* watchTodayAttendance() {
    yield takeLatest(TODAY_ATTENDANCE_REQUEST, todayAttendance);
}

function todayAttendanceAPI() {
    return axios.get("/today/attendance");
}

function* todayAttendance() {

    try {
        const result = yield call(todayAttendanceAPI);

        yield put({
            type: TODAY_ATTENDANCE_SUCCESS,
            data: result.data,
        });

        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TODAY_ATTENDANCE_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTodayTask() {
    yield takeLatest(TODAY_TASK_REQUEST, todayTask);
}

function todayTaskAPI() {
    return axios.get("/today/task");
}

function* todayTask() {

    try {
        const result = yield call(todayTaskAPI);

        yield put({
            type: TODAY_TASK_SUCCESS,
            data: result.data,
        });

        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TODAY_TASK_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* todaySaga() {
    yield all([fork(watchTodayAttendance), fork(watchTodayTask),]);
}