import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    COMPANYADDRESS_REGISTER_REQUEST,
    COMPANYADDRESS_REGISTER_SUCCESS,
    COMPANYADDRESS_REGISTER_FAILURE,

    COMPANYADDRESS_LIST_REQUEST,
    COMPANYADDRESS_LIST_SUCCESS,
    COMPANYADDRESS_LIST_FAILURE,

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



export default function* companyAddressSaga() {
    yield all([fork(watchCompanyRegister), fork(watchCompanyList),]);
}