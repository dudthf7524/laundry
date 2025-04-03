import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    // USER_CHECK_REQUEST,
    // USER_CHECK_SUCCESS,
    // USER_CHECK_FAILURE,

    // USER_JOIN_REQUEST,
    // USER_JOIN_SUCCESS,
    // USER_JOIN_FAILURE,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,

    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILURE,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAILURE,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,

    USER_AUTH_UPDATE_REQUEST,
    USER_AUTH_UPDATE_SUCCESS,
    USER_AUTH_UPDATE_FAILURE,

} from "../reducers/user";

// ✅ 사용자 로그인
function* watchUserLogin() {
    yield takeLatest(USER_LOGIN_REQUEST, userLogin);
}

function userLoginAPI(data) {

    return axios.post("/user/login", data);
}

function* userLogin(action) {
    try {
        const result = yield call(userLoginAPI, action.data);


        console.log(result.data)
        if (result.data === -1) {
            yield put({
                type: USER_LOGIN_FAILURE,
                error: result.data,
            });
            return;
        }
        if (result.data === 0) {
            yield put({
                type: USER_LOGIN_FAILURE,
                error: result.data,
            });
            return;
        }

        if (result.data) {
            yield put({
                type: USER_LOGIN_SUCCESS,
                error: result.data,
            });
            alert('로그인이 완료되었습니다.')
            window.location.href = "/login/sucess"

        }


    } catch (err) {
        yield put({
            type: USER_LOGIN_FAILURE,
            error: err.response.data,
        });
    }
}

// ✅ 사용자 쿠키세션 설정
function* watchUserAuth() {
    yield takeLatest(USER_AUTH_REQUEST, userAuth);
}

function userAuthAPI() {

    return axios.get("/user/auth");
}

function* userAuth() {
    try {
        const result = yield call(userAuthAPI);
        yield put({
            type: USER_AUTH_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_AUTH_FAILURE,
            error: err.response.data,
        });
    }
}

// ✅ 사용자 리스트
function* watchUserList() {
    yield takeLatest(USER_LIST_REQUEST, userList);
}

function userListAPI() {

    return axios.get("/user/list");
}

function* userList() {
    try {
        const result = yield call(userListAPI);
        yield put({
            type: USER_LIST_SUCCESS,
            data: result.data,
        });
        if (result.data) { }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_LIST_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUserUpdate() {
    yield takeLatest(USER_UPDATE_REQUEST, userUpdate);
}

function userUpdateAPI(data) {

    return axios.post("/user/update", data);
}

function* userUpdate(action) {
    try {
        const result = yield call(userUpdateAPI, action.data);

        yield put({
            type: USER_UPDATE_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('직원 정보 수정 완료')
            window.location.href = "/admin/employees";
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchUserAuthUpdate() {
    yield takeLatest(USER_AUTH_UPDATE_REQUEST, userAuthUpdate);
}

function userAuthUpdateAPI(data) {

    return axios.post("/user/update/auth", data);
}

function* userAuthUpdate(action) {
    try {
        const result = yield call(userAuthUpdateAPI, action.data);
        yield put({
            type: USER_AUTH_UPDATE_SUCCESS,
            data: result.data,
        });
        if (result.data) {
            alert('권한이 변경되었습니다.')
            window.location.href = "/admin/auth";
        }
    } catch (err) {
        console.error(err);
        yield put({
            type: USER_AUTH_UPDATE_FAILURE,
            error: err.response.data,
        });
    }
}



export default function* userSaga() {
    yield all([fork(watchUserLogin), fork(watchUserAuth), fork(watchUserList), fork(watchUserUpdate), fork(watchUserAuthUpdate),]);
}