import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    USER_PROCESS_REGISTER_REQUEST,
    USER_PROCESS_REGISTER_SUCCESS,
    USER_PROCESS_REGISTER_FAILURE,

    USER_PROCESS_ONE_LIST_REQUEST,
    USER_PROCESS_ONE_LIST_SUCCESS,
    USER_PROCESS_ONE_LIST_FAILURE,

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

function* watchProcessOneList() {
    yield takeLatest(USER_PROCESS_ONE_LIST_REQUEST, processOneList);
}

function processOneListAPI() {

    return axios.get("/userProcess/one/list", );
}

function* processOneList() {
    try {
        const result = yield call(processOneListAPI);
        if(result.data === 'common'){
            window.location.href="/"
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



export default function* userProcessSaga() {
    yield all([fork(watchProcessRegister), fork(watchProcessOneList),]);
}