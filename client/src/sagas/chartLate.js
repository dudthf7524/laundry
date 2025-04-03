import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    CHARTLATE_DATE_REQUEST,
    CHARTLATE_DATE_SUCCESS,
    CHARTLATE_DATE_FAILURE,

    CHARTLATE_MONTH_REQUEST,
    CHARTLATE_MONTH_SUCCESS,
    CHARTLATE_MONTH_FAILURE,

    CHARTLATE_YEAR_REQUEST,
    CHARTLATE_YEAR_SUCCESS,
    CHARTLATE_YEAR_FAILURE,

} from "../reducers/chartLate";



function* watchChartLateDate() {
    yield takeLatest(CHARTLATE_DATE_REQUEST, chartLateDate);
}

function chartLateDateAPI(data) {

    return axios.post("/chartLate/date", data);
}

function* chartLateDate(action) {
    try {
        const result = yield call(chartLateDateAPI, action.data);
        yield put({
            type: CHARTLATE_DATE_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: CHARTLATE_DATE_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchChartLateMonth() {
    yield takeLatest(CHARTLATE_MONTH_REQUEST, chartLateMonth);
}

function chartLateMonthAPI(data) {

    return axios.post("/chartLate/month", data);
}

function* chartLateMonth(action) {
    try {
        const result = yield call(chartLateMonthAPI, action.data);
       
        yield put({
            type: CHARTLATE_MONTH_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: CHARTLATE_MONTH_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchChartLateYear() {
    yield takeLatest(CHARTLATE_YEAR_REQUEST, chartLateYear);
}

function chartLateYearAPI(data) {

    return axios.post("/chartLate/year", data);
}

function* chartLateYear(action) {
    try {
        const result = yield call(chartLateYearAPI, action.data);
      
        yield put({
            type: CHARTLATE_YEAR_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: CHARTLATE_YEAR_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* chartLateSaga() {
    yield all([fork(watchChartLateDate), fork(watchChartLateMonth), fork(watchChartLateYear),]);
}