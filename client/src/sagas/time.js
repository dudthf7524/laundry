import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    TIME_REGISTER_REQUEST,
    TIME_REGISTER_SUCCESS,
    TIME_REGISTER_FAILURE,

} from "../reducers/time";

function* watchTimeRegister() {
    yield takeLatest(TIME_REGISTER_REQUEST, timeRegister);
}

function timeRegisterListAPI(data) {

    return axios.post("/time/register", data);
}

function* timeRegister(action) {
    try {
        const result = yield call(timeRegisterListAPI , action.data);
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



export default function* timeSaga() {
    yield all([fork(watchTimeRegister), ]);
}