import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

} from "../reducers/logout";

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout);
}

function logoutAPI() {

    return axios.get("/logout/logout");
}

function* logout() {
    try {
        const result = yield call(logoutAPI);
        yield put({
            type: LOGOUT_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('로그아웃 완료 로그인 창으로 이동합니다.')
            window.location.href = "/";
         }
    } catch (err) {
        console.error(err);
        yield put({
            type: LOGOUT_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* logoutSaga() {
    yield all([fork(watchLogout), ]);
}