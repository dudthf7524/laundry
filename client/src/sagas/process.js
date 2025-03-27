import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    PROCESS_LIST_REQUEST,
    PROCESS_LIST_SUCCESS,
    PROCESS_LIST_FAILURE,

    PROCESS_UPDATE_REQUEST,
    PROCESS_UPDATE_SUCCESS,
    PROCESS_UPDATE_FAILURE,

} from "../reducers/process";



function* watchProcessList() {
    yield takeLatest(PROCESS_LIST_REQUEST, processList);
}

function processListAPI() {

    return axios.get("/process/list");
}

function* processList() {
    try {
        const result = yield call(processListAPI);
        yield put({
            type: PROCESS_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: PROCESS_LIST_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchProcessUpdate() {
    yield takeLatest(PROCESS_UPDATE_REQUEST, processUpdate);
}

function processUpdateAPI(data) {

    return axios.post("/process/update", data);
}

function* processUpdate(action) {
    try {
        const result = yield call(processUpdateAPI, action.data);
        yield put({
            type: PROCESS_UPDATE_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert("업무 설정이 완료되었습니다.")
            window.location.href="/admin/settings"
         }
    } catch (err) {
        console.error(err);
        yield put({
            type: PROCESS_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* processSaga() {
    yield all([fork(watchProcessList), fork(watchProcessUpdate),]);
}