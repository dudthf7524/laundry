import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    PROCESS_LIST_REQUEST,
    PROCESS_LIST_SUCCESS,
    PROCESS_LIST_FAILURE,

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



export default function* processSaga() {
    yield all([fork(watchProcessList), ]);
}