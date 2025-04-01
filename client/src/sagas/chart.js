import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

import {

    CHART_DATE_REQUEST,
    CHART_DATE_SUCCESS,
    CHART_DATE_FAILURE,

    CHART_MONTH_REQUEST,
    CHART_MONTH_SUCCESS,
    CHART_MONTH_FAILURE,

    CHART_YEAR_REQUEST,
    CHART_YEAR_SUCCESS,
    CHART_YEAR_FAILURE,

} from "../reducers/chart";



function* watchChartDate() {
    yield takeLatest(CHART_DATE_REQUEST, chartDate);
}

function chartDateAPI(data) {

    return axios.post("/chart/date", data);
}

function* chartDate(action) {
    try {
        const result = yield call(chartDateAPI, action.data);
        yield put({
            type: CHART_DATE_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: CHART_DATE_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchChartMonth() {
    yield takeLatest(CHART_MONTH_REQUEST, chartMonth);
}

function chartMonthAPI(data) {

    return axios.post("/chart/month", data);
}

function* chartMonth(action) {
    try {
        const result = yield call(chartMonthAPI, action.data);
       
        yield put({
            type: CHART_MONTH_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: CHART_MONTH_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchChartYear() {
    yield takeLatest(CHART_YEAR_REQUEST, charYear);
}

function charYearAPI(data) {

    return axios.post("/chart/year", data);
}

function* charYear(action) {
    try {
        const result = yield call(charYearAPI, action.data);
      
        yield put({
            type: CHART_YEAR_SUCCESS,
            data: result.data,
        });
        if (result.data) {}
    } catch (err) {
        console.error(err);
        yield put({
            type: CHART_YEAR_FAILURE,
            error: err.response.data,
        });
    }
}

export default function* chartSaga() {
    yield all([fork(watchChartDate), fork(watchChartMonth), fork(watchChartYear),]);
}