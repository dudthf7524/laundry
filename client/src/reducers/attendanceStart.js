import produce from "../util/produce";

export const initialState = {

    attendanceStart_register_Loading: false,
    attendanceStart_register_done: false,
    attendanceStart_register_error: null,

    attendanceStart_new_one_Loading: false,
    attendanceStart_new_one_done: false,
    attendanceStart_new_one_error: null,

    attendanceStart_date_Loading: false,
    attendanceStart_date_done: false,
    attendanceStart_date_error: null,

    attendanceStart_month_Loading: false,
    attendanceStart_month_done: false,
    attendanceStart_month_error: null,

    attendanceStart_year_Loading: false,
    attendanceStart_year_one_done: false,
    attendanceStart_year_one_error: null,

    attendanceStartNewOne: null,
    attendanceStartYear: null
};


export const ATTENDANCESTART_REGISTER_REQUEST = "ATTENDANCESTART_REGISTER_REQUEST";
export const ATTENDANCESTART_REGISTER_SUCCESS = "ATTENDANCESTART_REGISTER_SUCCESS";
export const ATTENDANCESTART_REGISTER_FAILURE = "ATTENDANCESTART_REGISTER_FAILURE";

export const ATTENDANCESTART_NEW_ONE_REQUEST = "ATTENDANCESTART_NEW_ONE_REQUEST";
export const ATTENDANCESTART_NEW_ONE_SUCCESS = "ATTENDANCESTART_NEW_ONE_SUCCESS";
export const ATTENDANCESTART_NEW_ONE_FAILURE = "ATTENDANCESTART_NEW_ONE_FAILURE";

export const ATTENDANCESTART_DATE_REQUEST = "ATTENDANCESTART_DATE_REQUEST";
export const ATTENDANCESTART_DATE_SUCCESS = "ATTENDANCESTART_DATE_SUCCESS";
export const ATTENDANCESTART_DATE_FAILURE = "ATTENDANCESTART_DATE_FAILURE";

export const ATTENDANCESTART_MONTH_REQUEST = "ATTENDANCESTART_MONTH_REQUEST";
export const ATTENDANCESTART_MONTH_SUCCESS = "ATTENDANCESTART_MONTH_SUCCESS";
export const ATTENDANCESTART_MONTH_FAILURE = "ATTENDANCESTART_MONTH_FAILURE";

export const ATTENDANCESTART_YEAR_REQUEST = "ATTENDANCESTART_YEAR_REQUEST";
export const ATTENDANCESTART_YEAR_SUCCESS = "ATTENDANCESTART_YEAR_SUCCESS";
export const ATTENDANCESTART_YEAR_FAILURE = "ATTENDANCESTART_YEAR_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ATTENDANCESTART_REGISTER_REQUEST:
                draft.attendanceStart_register_Loading = true;
                draft.attendanceStart_register_error = null;
                draft.attendanceStart_register_done = false;
                break;
            case ATTENDANCESTART_REGISTER_SUCCESS:
                draft.attendanceStart_register_Loading = false;
                draft.attendanceStart_register_done = true;
                break;
            case ATTENDANCESTART_REGISTER_FAILURE:
                draft.attendanceStart_register_Loading = false;
                draft.attendanceStart_register_error = action.error;
                break;
            case ATTENDANCESTART_NEW_ONE_REQUEST:
                draft.attendanceStart_new_one_Loading = true;
                draft.attendanceStart_new_one_error = null;
                draft.attendanceStart_new_one_done = false;
                break;
            case ATTENDANCESTART_NEW_ONE_SUCCESS:
                draft.attendanceStart_new_one_Loading = false;
                draft.attendanceStartNewOne = action.data
                draft.attendanceStart_new_one_done = true;
                break;
            case ATTENDANCESTART_NEW_ONE_FAILURE:
                draft.attendanceStart_new_one_Loading = false;
                draft.attendanceStart_new_one_error = action.error;
                break;
            case ATTENDANCESTART_DATE_REQUEST:
                draft.attendanceStart_date_Loading = true;
                draft.attendanceStart_date_error = null;
                draft.attendanceStart_date_done = false;
                break;
            case ATTENDANCESTART_DATE_SUCCESS:
                draft.attendanceStart_date_Loading = false;
                draft.attendanceStartYear = action.data
                draft.attendanceStart_date_done = true;
                break;
            case ATTENDANCESTART_DATE_FAILURE:
                draft.attendanceStart_date_Loading = false;
                draft.attendanceStart_date_error = action.error;
                break;
            case ATTENDANCESTART_MONTH_REQUEST:
                draft.attendanceStart_month_Loading = true;
                draft.attendanceStart_month_error = null;
                draft.attendanceStart_month_done = false;
                break;
            case ATTENDANCESTART_MONTH_SUCCESS:
                draft.attendanceStart_month_Loading = false;
                draft.attendanceStartYear = action.data
                draft.attendanceStart_month_done = true;
                break;
            case ATTENDANCESTART_MONTH_FAILURE:
                draft.attendanceStart_month_Loading = false;
                draft.attendanceStart_month_error = action.error;
                break;
            case ATTENDANCESTART_YEAR_REQUEST:
                draft.attendanceStart_year_Loading = true;
                draft.attendanceStart_year_error = null;
                draft.attendanceStart_year_done = false;
                break;
            case ATTENDANCESTART_YEAR_SUCCESS:
                draft.attendanceStart_year_Loading = false;
                draft.attendanceStartYear = action.data
                draft.attendanceStart_year_done = true;
                break;
            case ATTENDANCESTART_YEAR_FAILURE:
                draft.attendanceStart_year_Loading = false;
                draft.attendanceStart_year_error = action.error;
                break;

            default:
                return state;
        }
    });
};

export default reducer;