import produce from "../util/produce";

export const initialState = {

    chartLate_date_Loading: false,
    chartLate_date_done: false,
    chartLate_date_error: null,

    chartLate_month_Loading: false,
    chartLate_month_done: false,
    chartLate_month_error: null,

    chartLate_year_Loading: false,
    chartLate_year_done: false,
    chartLate_year_error: null,

    chartLateDatas : null,
};

export const CHARTLATE_DATE_REQUEST = "CHARTLATE_DATE_REQUEST";
export const CHARTLATE_DATE_SUCCESS = "CHARTLATE_DATE_SUCCESS";
export const CHARTLATE_DATE_FAILURE = "CHARTLATE_DATE_FAILURE";

export const CHARTLATE_MONTH_REQUEST = "CHARTLATE_MONTH_REQUEST";
export const CHARTLATE_MONTH_SUCCESS = "CHARTLATE_MONTH_SUCCESS";
export const CHARTLATE_MONTH_FAILURE = "CHARTLATE_MONTH_FAILURE";

export const CHARTLATE_YEAR_REQUEST = "CHARTLATE_YEAR_REQUEST";
export const CHARTLATE_YEAR_SUCCESS = "CHARTLATE_YEAR_SUCCESS";
export const CHARTLATE_YEAR_FAILURE = "CHARTLATE_YEAR_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case CHARTLATE_DATE_REQUEST:
                draft.chartLate_date_Loading = true;
                draft.chartLate_date_error = null;
                draft.chartLate_date_done = false;
                break;
            case CHARTLATE_DATE_SUCCESS:
                draft.chartLate_date_Loading = false;
                draft.chartLateDatas = action.data;
                draft.chartLate_date_done = true;
                break;
            case CHARTLATE_DATE_FAILURE:
                draft.chartLate_date_Loading = false;
                draft.chartLate_date_error = action.error;
                break;
            case CHARTLATE_MONTH_REQUEST:
                draft.chartLate_month_Loading = true;
                draft.chartLate_month_error = null;
                draft.chartLate_month_done = false;
                break;
            case CHARTLATE_MONTH_SUCCESS:
                draft.chartLate_month_Loading = false;
                draft.chartLateDatas = action.data;
                draft.chartLate_month_done = true;
                break;
            case CHARTLATE_MONTH_FAILURE:
                draft.chartLate_month_Loading = false;
                draft.chartLate_month_error = action.error;
                break;
            case CHARTLATE_YEAR_REQUEST:
                draft.chartLate_year_Loading = true;
                draft.chartLate_year_error = null;
                draft.chartLate_year_done = false;
                break;
            case CHARTLATE_YEAR_SUCCESS:
                draft.chartLate_year_Loading = false;
                draft.chartLateDatas = action.data;
                draft.chartLate_year_done = true;
                break;
            case CHARTLATE_YEAR_FAILURE:
                draft.chartLate_year_Loading = false;
                draft.chartLate_year_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;