import produce from "../util/produce";

export const initialState = {

    attendanceEnd_time_Loading: false,
    attendanceEnd_time_done: false,
    attendanceEnd_time_error: null,

    attendanceEnd_time_admin_Loading: false,
    attendanceEnd_time_admin_done: false,
    attendanceEnd_time_admin_error: null,
};

export const ATTENDANCEEND_TIME_REQUEST = "ATTENDANCEEND_TIME_REQUEST";
export const ATTENDANCEEND_TIME_SUCCESS = "ATTENDANCEEND_TIME_SUCCESS";
export const ATTENDANCEEND_TIME_FAILURE = "ATTENDANCEEND_TIME_FAILURE";

export const ATTENDANCEEND_TIME_ADMIN_REQUEST = "ATTENDANCEEND_TIME_ADMIN_REQUEST";
export const ATTENDANCEEND_TIME_ADMIN_SUCCESS = "ATTENDANCEEND_TIME_ADMIN_SUCCESS";
export const ATTENDANCEEND_TIME_ADMIN_FAILURE = "ATTENDANCEEND_TIME_ADMIN_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ATTENDANCEEND_TIME_REQUEST:
                draft.attendanceEnd_time_Loading = true;
                draft.attendanceEnd_time_error = null;
                draft.attendanceEnd_time_done = false;
                break;
            case ATTENDANCEEND_TIME_SUCCESS:
                draft.attendanceEnd_time_Loading = false;
                draft.attendanceEnd_time_done = true;
                break;
            case ATTENDANCEEND_TIME_FAILURE:
                draft.attendanceEnd_time_Loading = false;
                draft.attendanceEnd_time_error = action.error;
                break;
            case ATTENDANCEEND_TIME_ADMIN_REQUEST:
                draft.attendanceEnd_time_admin_Loading = true;
                draft.attendanceEnd_time_admin_error = null;
                draft.attendanceEnd_time_admin_done = false;
                break;
            case ATTENDANCEEND_TIME_ADMIN_SUCCESS:
                draft.attendanceEnd_time_admin_Loading = false;
                draft.attendanceEnd_time_admin_done = true;
                break;
            case ATTENDANCEEND_TIME_ADMIN_FAILURE:
                draft.attendanceEnd_time_admin_Loading = false;
                draft.attendanceEnd_time_admin_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;