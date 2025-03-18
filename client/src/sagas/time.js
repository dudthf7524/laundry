import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    TIME_REGISTER_REQUEST,
    TIME_REGISTER_SUCCESS,
    TIME_REGISTER_FAILURE,

    TIME_DETAIL_REQUEST,
    TIME_DETAIL_SUCCESS,
    TIME_DETAIL_FAILURE,

} from "../reducers/time";

function* watchTimeRegister() {
    yield takeLatest(TIME_REGISTER_REQUEST, timeRegister);
}

function timeRegisterListAPI(data) {

    return axios.post("/time/register", data);
}

function* timeRegister(action) {
    try {
        const result = yield call(timeRegisterListAPI, action.data);
        yield put({
            type: TIME_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTimeDetail() {
    yield takeLatest(TIME_DETAIL_REQUEST, timeDetail);
}

function timeDetailListAPI() {

    return axios.get("/time/detail");
}

function* timeDetail() {
    try {
        const result = yield call(timeDetailListAPI,);
        if (result.data === 'common') {
            window.location.href = "/";
            return;
        }
        yield put({
            type: TIME_DETAIL_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_DETAIL_FAILURE,
            error: err.response.data,
        });
    }
}




export default function* timeSaga() {
    yield all([fork(watchTimeRegister), fork(watchTimeDetail)]);
}