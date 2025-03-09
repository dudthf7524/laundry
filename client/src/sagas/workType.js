import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {
    WORKTYPE_REGISTER_REQUEST,
    WORKTYPE_REGISTER_SUCCESS,
    WORKTYPE_REGISTER_FAILURE,
    
    WORKTYPE_LIST_REQUEST,
    WORKTYPE_LIST_SUCCESS,
    WORKTYPE_LIST_FAILURE,
    
 

} from "../reducers/workType";

function* watchWorkTypeRegister() {
    yield takeLatest(WORKTYPE_REGISTER_REQUEST, workTypeRegister);
}

function workTypeRegisterAPI(data) {

    return axios.post("/workType/register", data);
}

function* workTypeRegister(action) {
    try {
        const result = yield call(workTypeRegisterAPI, action.data);
        yield put({
            type: WORKTYPE_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORKTYPE_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchWorkTypeList() {
    yield takeLatest(WORKTYPE_LIST_REQUEST, workTypeList);
}

function workTypeListAPI() {

    return axios.get("/workType/list", );
}

function* workTypeList() {
    try {
        const result = yield call(workTypeListAPI);
        yield put({
            type: WORKTYPE_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: WORKTYPE_LIST_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* workTypeSaga() {
    yield all([fork(watchWorkTypeRegister), fork(watchWorkTypeList) ]);
}