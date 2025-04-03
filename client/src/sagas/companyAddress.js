import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    COMPANYADDRESS_REGISTER_REQUEST,
    COMPANYADDRESS_REGISTER_SUCCESS,
    COMPANYADDRESS_REGISTER_FAILURE,

    COMPANYADDRESS_LIST_REQUEST,
    COMPANYADDRESS_LIST_SUCCESS,
    COMPANYADDRESS_LIST_FAILURE,

    COMPANYADDRESS_DELETE_REQUEST,
    COMPANYADDRESS_DELETE_SUCCESS,
    COMPANYADDRESS_DELETE_FAILURE,

} from "../reducers/companyAddress";

function* watchCompanyRegister() {
    yield takeLatest(COMPANYADDRESS_REGISTER_REQUEST, companyRegister);
}

function companyRegisterAPI(data) {
   
    return axios.post("/companyAddress/register", data);
}

function* companyRegister(action) {
    try {
        const result = yield call(companyRegisterAPI, action.data);
        if(result.data === -1){
            alert('이미 근무지가 등록되어 있습니다.')
            return;
        }
        if(result){
            alert('근무지가 등록되었습니다.')
            window.location.href = "/admin/company/address"
        }
        yield put({
            type: COMPANYADDRESS_REGISTER_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: COMPANYADDRESS_REGISTER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchCompanyList() {
    yield takeLatest(COMPANYADDRESS_LIST_REQUEST, companyList);
}

function companyListAPI(data) {
   
    return axios.get("/companyAddress/list", data);
}

function* companyList(action) {
    try {
        const result = yield call(companyListAPI, action.data);
       
        yield put({
            type: COMPANYADDRESS_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: COMPANYADDRESS_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchCompanyDelete() {
    yield takeLatest(COMPANYADDRESS_DELETE_REQUEST, companyDelete);
}

function companyDeleteAPI(data) {
   
    return axios.post("/companyAddress/delete", data);
}

function* companyDelete(action) {
    try {
        const result = yield call(companyDeleteAPI, action.data);
       
        yield put({
            type: COMPANYADDRESS_DELETE_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('근무지가 삭제되었습니다.')
            window.location.href = "/admin/settings"
         }
    } catch (err) {
        console.error(err);
        yield put({
            type: COMPANYADDRESS_DELETE_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* companyAddressSaga() {
    yield all([fork(watchCompanyRegister), fork(watchCompanyList), fork(watchCompanyDelete),]);
}