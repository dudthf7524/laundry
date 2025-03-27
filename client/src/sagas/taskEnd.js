import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    TASKEND_REGISTER_REQUEST,
    TASKEND_REGISTER_SUCCESS,
    TASKEND_REGISTER_FAILURE,

    

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

export default function* taskEndSaga() {
    yield all([fork(watchTaskEndRegister)]);
}