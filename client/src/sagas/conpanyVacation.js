import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    COMPANY_VACATION_REGISTER_REQUEST,
    COMPANY_VACATION_REGISTER_SUCCESS,
    COMPANY_VACATION_REGISTER_FAILURE,

    COMPANY_VACATION_LIST_REQUEST,
    COMPANY_VACATION_LIST_SUCCESS,
    COMPANY_VACATION_LIST_FAILURE,

  

} from "../reducers/companyVacation";



function* watchCompanyVacationRegister() {
    yield takeLatest(COMPANY_VACATION_REGISTER_REQUEST, companyVacationRegister);
}

function companyVacationRegisterAPI(data) {

    return axios.post("/company/vacation/register", data);
}

function* companyVacationRegister(action) {
    try {
        const result = yield call(companyVacationRegisterAPI, action.data);
        if (result.data === "common") {
            window.location.href = "/";
            return;
        } else if (result.data) {
            alert('휴무일이 저장되었습니다.')
            window.location.href = "/admin/vacation"
        }
        
        yield put({
            type: COMPANY_VACATION_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: COMPANY_VACATION_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchCompanyVacationList() {
    yield takeLatest(COMPANY_VACATION_LIST_REQUEST, companyVacationList);
}

function companyVacationListAPI(data) {

    return axios.get("/company/vacation/list", data);
}

function* companyVacationList(action) {
    try {
        const result = yield call(companyVacationListAPI, action.data);
       
        yield put({
            type: COMPANY_VACATION_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: COMPANY_VACATION_LIST_FAILURE,
            error: err.response.data,
        });
    }
}







export default function* companyVacationSaga() {
    yield all([fork(watchCompanyVacationRegister), fork(watchCompanyVacationList), ]);
}