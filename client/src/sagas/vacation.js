import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    VACATION_REGISTER_REQUEST,
    VACATION_REGISTER_SUCCESS,
    VACATION_REGISTER_FAILURE,

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



export default function* vacationSaga() {
    yield all([fork(watchVacationRegister)]);
}