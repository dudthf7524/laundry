import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    USER_PROCESS_REGISTER_REQUEST,
    USER_PROCESS_REGISTER_SUCCESS,
    USER_PROCESS_REGISTER_FAILURE,

    USER_PROCESS_LIST_REQUEST,
    USER_PROCESS_LIST_SUCCESS,
    USER_PROCESS_LIST_FAILURE,

    USER_PROCESS_ONE_LIST_REQUEST,
    USER_PROCESS_ONE_LIST_SUCCESS,
    USER_PROCESS_ONE_LIST_FAILURE,

    USER_PROCESS_DELETE_REQUEST,
    USER_PROCESS_DELETE_SUCCESS,
    USER_PROCESS_DELETE_FAILURE,


} from "../reducers/userProcess";

function* watchProcessRegister() {
    yield takeLatest(USER_PROCESS_REGISTER_REQUEST, processRegister);
}

function processRegisterAPI(data) {

    return axios.post("/userProcess/register", data);
}

function* processRegister(action) {
    try {
        const result = yield call(processRegisterAPI, action.data);

        if (result.data === -1) {
            alert('이미 등록된 업무입니다.')
            return;
        }
        if (result.data) {
            alert('등록이 완료되었습니다.')
            window.location.href = "/admin/task"
        }
        yield put({
            type: USER_PROCESS_REGISTER_SUCCESS,
        });

        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_PROCESS_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchProcessList() {
    yield takeLatest(USER_PROCESS_LIST_REQUEST, processList);
}

function processListAPI() {

    return axios.get("/userProcess/list",);
}

function* processList() {
    try {
        const result = yield call(processListAPI);
        if (result.data === 'common') {
            window.location.href = "/"
            return;
        }
        yield put({
            type: USER_PROCESS_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_PROCESS_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchProcessOneList() {
    yield takeLatest(USER_PROCESS_ONE_LIST_REQUEST, processOneList);
}

function processOneListAPI() {

    return axios.get("/userProcess/one/list",);
}

function* processOneList() {
    try {
        const result = yield call(processOneListAPI);
        if (result.data === 'common') {
            window.location.href = "/"
            return;
        }
        yield put({
            type: USER_PROCESS_ONE_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_PROCESS_ONE_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchProcessDelete() {
    yield takeLatest(USER_PROCESS_DELETE_REQUEST, processDelete);
}

function processDeleteAPI(data) {

    return axios.post("/userProcess/delete", data);
}

function* processDelete(action) {
    try {
        const result = yield call(processDeleteAPI, action.data);
        if (result.data) {
            alert('삭제가 완료되었습니다.')
            window.location.href = "/admin/task"
        }
        yield put({
            type: USER_PROCESS_DELETE_SUCCESS,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_PROCESS_DELETE_FAILURE,
            error: err.response.data,
        });
    }
}


export default function* userProcessSaga() {
    yield all([fork(watchProcessRegister), fork(watchProcessList), fork(watchProcessOneList), fork(watchProcessDelete)]);
}