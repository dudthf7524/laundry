import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    TIME_REGISTER_REQUEST,
    TIME_REGISTER_SUCCESS,
    TIME_REGISTER_FAILURE,
    
    TIME_LIST_REQUEST,
    TIME_LIST_SUCCESS,
    TIME_LIST_FAILURE,

    TIME_DETAIL_REQUEST,
    TIME_DETAIL_SUCCESS,
    TIME_DETAIL_FAILURE,

    TIME_UPDATE_REQUEST,
    TIME_UPDATE_SUCCESS,
    TIME_UPDATE_FAILURE,

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

function* watchTimeList() {
    yield takeLatest(TIME_LIST_REQUEST, timeList);
}

function timeListAPI() {

    return axios.get("/time/list");
}

function* timeList() {
    try {
        const result = yield call(timeListAPI,);
        if (result.data === 'common') {
            alert('로그인 후 이용해주세요')
            window.location.href = "/";
            return;
        }
        yield put({
            type: TIME_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_LIST_FAILURE,
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
        
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_DETAIL_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchTimeUpdate() {
    yield takeLatest(TIME_UPDATE_REQUEST, timeUpdate);
}

function timeUpdateAPI(data) {

    return axios.post("/time/update", data);
}

function* timeUpdate(action) {
    try {
        const result = yield call(timeUpdateAPI, action.data);
        if(result.data){
            alert('시간수정이 완료되었습니다.')
            window.location.href = "/admin/time"
        }
        yield put({
            type: TIME_UPDATE_SUCCESS,
            data: result.data,
        });
        
    } catch (err) {
        console.error(err);
        yield put({
            type: TIME_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* timeSaga() {
    yield all([fork(watchTimeRegister), fork(watchTimeList), fork(watchTimeDetail), fork(watchTimeUpdate),]);
}