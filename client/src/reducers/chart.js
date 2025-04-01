import produce from "../util/produce";

export const initialState = {

    chart_date_Loading: false,
    chart_date_done: false,
    chart_date_error: null,

    chart_month_Loading: false,
    chart_month_done: false,
    chart_month_error: null,

    chart_year_Loading: false,
    chart_year_done: false,
    chart_year_error: null,


    chartDates : null,
    chartMonthes : null,
    chartYears : null,


};





export const CHART_DATE_REQUEST = "CHART_DATE_REQUEST";
export const CHART_DATE_SUCCESS = "CHART_DATE_SUCCESS";
export const CHART_DATE_FAILURE = "CHART_DATE_FAILURE";

export const CHART_MONTH_REQUEST = "CHART_MONTH_REQUEST";
export const CHART_MONTH_SUCCESS = "CHART_MONTH_SUCCESS";
export const CHART_MONTH_FAILURE = "CHART_MONTH_FAILURE";

export const CHART_YEAR_REQUEST = "CHART_YEAR_REQUEST";
export const CHART_YEAR_SUCCESS = "CHART_YEAR_SUCCESS";
export const CHART_YEAR_FAILURE = "CHART_YEAR_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case CHART_DATE_REQUEST:
                draft.chart_date_Loading = true;
                draft.chart_date_error = null;
                draft.chart_date_done = false;
                break;
            case CHART_DATE_SUCCESS:
                draft.chart_date_Loading = false;
                draft.chartDates = action.data;
                draft.chart_date_done = true;
                break;
            case CHART_DATE_FAILURE:
                draft.chart_date_Loading = false;
                draft.chart_date_error = action.error;
                break;
            case CHART_MONTH_REQUEST:
                draft.chart_month_Loading = true;
                draft.chart_month_error = null;
                draft.chart_month_done = false;
                break;
            case CHART_MONTH_SUCCESS:
                draft.chart_month_Loading = false;
                draft.chartDates = action.data;
                draft.chart_month_done = true;
                break;
            case CHART_MONTH_FAILURE:
                draft.chart_month_Loading = false;
                draft.chart_month_error = action.error;
                break;
            case CHART_YEAR_REQUEST:
                draft.chart_year_Loading = true;
                draft.chart_year_error = null;
                draft.chart_year_done = false;
                break;
            case CHART_YEAR_SUCCESS:
                draft.chart_year_Loading = false;
                draft.chartDates = action.data;
                draft.chart_year_done = true;
                break;
            case CHART_YEAR_FAILURE:
                draft.chart_year_Loading = false;
                draft.chart_year_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;