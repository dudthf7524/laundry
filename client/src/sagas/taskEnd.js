import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    TASKEND_REGISTER_REQUEST,
    TASKEND_REGISTER_SUCCESS,
    TASKEND_REGISTER_FAILURE,

    TASKEND_REGISTER_ADMIN_REQUEST,
    TASKEND_REGISTER_ADMIN_SUCCESS,
    TASKEND_REGISTER_ADMIN_FAILURE,

} from "../reducers/taskEnd";

function* watchTaskEndRegister() {
    yield takeLatest(TASKEND_REGISTER_REQUEST, taskEndRegister);
}

function taskEndRegisterAPI(data) {

    return axios.post("/taskEnd/register", data);
}

function* taskEndRegister(action) {
    try {
        const result = yield call(taskEndRegisterAPI, action.data);
        if (result.data) {
            window.location.href = "/task";
        }
        yield put({
            type: TASKEND_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKEND_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTaskEndAdminRegister() {
    yield takeLatest(TASKEND_REGISTER_ADMIN_REQUEST, taskEndAdminRegister);
}

function taskEndAdminRegisterAPI(data) {

    return axios.post("/taskEnd/admin/register", data);
}

function* taskEndAdminRegister(action) {
    try {
        const result = yield call(taskEndAdminRegisterAPI, action.data);
        if (result.data) {
            window.location.href = "/admin/tasks";
        }
        yield put({
            type: TASKEND_REGISTER_ADMIN_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TASKEND_REGISTER_ADMIN_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* taskEndSaga() {
    yield all([fork(watchTaskEndRegister), fork(watchTaskEndAdminRegister)]);
}