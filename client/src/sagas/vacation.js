import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    VACATION_REGISTER_REQUEST,
    VACATION_REGISTER_SUCCESS,
    VACATION_REGISTER_FAILURE,

    VACATION_LIST_REQUEST,
    VACATION_LIST_SUCCESS,
    VACATION_LIST_FAILURE,

    VACATION_ALLOW_REQUEST,
    VACATION_ALLOW_SUCCESS,
    VACATION_ALLOW_FAILURE,

} from "../reducers/vacation";



function* watchVacationRegister() {
    yield takeLatest(VACATION_REGISTER_REQUEST, vacationRegister);
}

function vacationRegisterAPI(data) {

    return axios.post("/vacation/register", data);
}

function* vacationRegister(action) {
    try {
        const result = yield call(vacationRegisterAPI, action.data);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        } else if (result.data) {
            window.location.href = "/attendance"
        }
        
        yield put({
            type: VACATION_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: VACATION_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchVacationList() {
    yield takeLatest(VACATION_LIST_REQUEST, vacationList);
}

function vacationListAPI(data) {

    return axios.get("/vacation/list", data);
}

function* vacationList(action) {
    try {
        const result = yield call(vacationListAPI, action.data);
       
        yield put({
            type: VACATION_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: VACATION_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchVacationAllow() {
    yield takeLatest(VACATION_ALLOW_REQUEST, vacationAllow);
}

function vacationAllowAPI(data) {

    return axios.post("/vacation/allow" , data);
}

function* vacationAllow(action) {
    try {
        const result = yield call(vacationAllowAPI, action.data);
    
        yield put({
            type: VACATION_ALLOW_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: VACATION_ALLOW_FAILURE,
            error: err.response.data,
        });
    }
}






export default function* vacationSaga() {
    yield all([fork(watchVacationRegister), fork(watchVacationList), fork(watchVacationAllow),]);
}