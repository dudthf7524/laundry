import produce from "../util/produce";

export const initialState = {

    today_attendance_Loading: false,
    today_attendance_done: false,
    today_attendance_error: null,

    today_task_Loading: false,
    today_task_done: false,
    today_task_error: null,

    today_attendance: null,
    today_task: null,

};

export const TODAY_ATTENDANCE_REQUEST = "TODAY_ATTENDANCE_REQUEST";
export const TODAY_ATTENDANCE_SUCCESS = "TODAY_ATTENDANCE_SUCCESS";
export const TODAY_ATTENDANCE_FAILURE = "TODAY_ATTENDANCE_FAILURE";

export const TODAY_TASK_REQUEST = "TODAY_TASK_REQUEST";
export const TODAY_TASK_SUCCESS = "TODAY_TASK_SUCCESS";
export const TODAY_TASK_FAILURE = "TODAY_TASK_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case TODAY_ATTENDANCE_REQUEST:
                draft.today_attendance_Loading = true;
                draft.today_attendance_error = null;
                draft.today_attendance_done = false;
                break;
            case TODAY_ATTENDANCE_SUCCESS:
                draft.today_attendance_Loading = false;
                draft.today_attendance = action.data;
                draft.today_attendance_done = true;
                break;
            case TODAY_ATTENDANCE_FAILURE:
                draft.today_attendance_Loading = false;
                draft.today_attendance_error = action.error;
                break;
            case TODAY_TASK_REQUEST:
                draft.today_task_Loading = true;
                draft.today_task_error = null;
                draft.today_task_done = false;
                break;
            case TODAY_TASK_SUCCESS:
                draft.today_task_Loading = false;
                draft.today_task = action.data;
                draft.today_task_done = true;
                break;
            case TODAY_TASK_FAILURE:
                draft.today_task_Loading = false;
                draft.today_task_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;