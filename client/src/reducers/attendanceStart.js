import produce from "../util/produce";

export const initialState = {

    attendanceStart_register_Loading: false,
    attendanceStart_register_done: false,
    attendanceStart_register_error: null,

    attendanceStart_new_one_Loading: false,
    attendanceStart_new_one_done: false,
    attendanceStart_new_one_error: null,

    work_end_time_Loading: false,
    work_end_time_done: false,
    work_end_time_error: null,

    attendanceStartNewOne: null

};


export const ATTENDANCESTART_REGISTER_REQUEST = "ATTENDANCESTART_REGISTER_REQUEST";
export const ATTENDANCESTART_REGISTER_SUCCESS = "ATTENDANCESTART_REGISTER_SUCCESS";
export const ATTENDANCESTART_REGISTER_FAILURE = "ATTENDANCESTART_REGISTER_FAILURE";

export const ATTENDANCESTART_NEW_ONE_REQUEST = "ATTENDANCESTART_NEW_ONE_REQUEST";
export const ATTENDANCESTART_NEW_ONE_SUCCESS = "ATTENDANCESTART_NEW_ONE_SUCCESS";
export const ATTENDANCESTART_NEW_ONE_FAILURE = "ATTENDANCESTART_NEW_ONE_FAILURE";


export const WORK_END_TIME_REQUEST = "WORK_END_TIME_REQUEST";
export const WORK_END_TIME_SUCCESS = "WORK_END_TIME_SUCCESS";
export const WORK_END_TIME_FAILURE = "WORK_END_TIME_FAILURE";

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
            case WORK_END_TIME_REQUEST:
                draft.work_end_time_Loading = true;
                draft.work_end_time_error = null;
                draft.work_end_time_done = false;
                break;
            case WORK_END_TIME_SUCCESS:
                draft.work_end_time_Loading = false;
                draft.work_end_time_done = true;
                break;
            case WORK_END_TIME_FAILURE:
                draft.work_end_time_Loading = false;
                draft.work_end_time_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;