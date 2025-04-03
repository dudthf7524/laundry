import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    NOTICE_LIST_REQUEST,
    NOTICE_LIST_SUCCESS,
    NOTICE_LIST_FAILURE,

    NOTICE_UPDATE_REQUEST,
    NOTICE_UPDATE_SUCCESS,
    NOTICE_UPDATE_FAILURE,

} from "../reducers/notice";

function* watchNoticeList() {
    yield takeLatest(NOTICE_LIST_REQUEST, noticeList);
}

function noticeListAPI() {

    return axios.get("/notice/list");
}

function* noticeList() {
    try {
        const result = yield call(noticeListAPI);
        yield put({
            type: NOTICE_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: NOTICE_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchNoticeUpdate() {
    yield takeLatest(NOTICE_UPDATE_REQUEST, noticeUpdate);
}

function noticeUpdateAPI(data) {

    return axios.post("/notice/update" ,data);
}

function* noticeUpdate(action) {
    try {
        const result = yield call(noticeUpdateAPI, action.data);
        if(result.data[0] > 0){
            alert('공지사항 수정이 완료되었습니다.')
            window.location.href = "/admin/notice"
        }else if(result.data[0] === 0){
            alert('수정된 내용이 없습니다.')
        }
        
        yield put({
            type: NOTICE_UPDATE_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: NOTICE_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* noticeSaga() {
    yield all([fork(watchNoticeList), fork(watchNoticeUpdate),]);
}