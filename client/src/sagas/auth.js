import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    AUTH_LIST_REQUEST,
    AUTH_LIST_SUCCESS,
    AUTH_LIST_FAILURE,

} from "../reducers/auth";

function* watchAuthList() {
    yield takeLatest(AUTH_LIST_REQUEST, authList);
}

function authListAPI() {

    return axios.get("/auth/list");
}

function* authList() {
    try {
        const result = yield call(authListAPI);
        yield put({
            type: AUTH_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: AUTH_LIST_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* authSaga() {
    yield all([fork(watchAuthList), ]);
}