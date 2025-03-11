import produce from "../util/produce";

export const initialState = {

    task_register_Loading: false,
    task_register_done: false,
    task_register_error: null,

    task_new_one_Loading: false,
    task_new_one_done: false,
    task_new_one_error: null,

    task_end_time_Loading: false,
    task_end_time_done: false,
    task_end_time_error: null,

    taskNewOne: null

};


export const TASK_REGISTER_REQUEST = "TASK_REGISTER_REQUEST";
export const TASK_REGISTER_SUCCESS = "TASK_REGISTER_SUCCESS";
export const TASK_REGISTER_FAILURE = "TASK_REGISTER_FAILURE";

export const TASK_NEW_ONE_REQUEST = "TASK_NEW_ONE_REQUEST";
export const TASK_NEW_ONE_SUCCESS = "TASK_NEW_ONE_SUCCESS";
export const TASK_NEW_ONE_FAILURE = "TASK_NEW_ONE_FAILURE";


export const TASK_END_TIME_REQUEST = "TASK_NEW_ONE_REQUEST";
export const TASK_END_TIME_SUCCESS = "TASK_NEW_ONE_SUCCESS";
export const TASK_END_TIME_FAILURE = "TASK_NEW_ONE_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case TASK_REGISTER_REQUEST:
                draft.task_register_Loading = true;
                draft.task_register_error = null;
                draft.task_register_done = false;
                break;
            case TASK_REGISTER_SUCCESS:
                draft.task_register_Loading = false;
                draft.task_register_done = true;
                break;
            case TASK_REGISTER_FAILURE:
                draft.task_register_Loading = false;
                draft.task_register_error = action.error;
                break;
            case TASK_NEW_ONE_REQUEST:
                draft.task_new_one_Loading = true;
                draft.task_new_one_error = null;
                draft.task_new_one_done = false;
                break;
            case TASK_NEW_ONE_SUCCESS:
                draft.task_new_one_Loading = false;
                draft.taskNewOne = action.data
                draft.task_new_one_done = true;
                break;
            case TASK_NEW_ONE_FAILURE:
                draft.task_new_one_Loading = false;
                draft.task_new_one_error = action.error;
                break;
            case TASK_END_TIME_REQUEST:
                draft.task_end_time_Loading = true;
                draft.task_end_time_error = null;
                draft.task_end_time_done = false;
                break;
            case TASK_END_TIME_SUCCESS:
                draft.task_end_time_Loading = false;
                draft.task_end_time_done = true;
                break;
            case TASK_END_TIME_FAILURE:
                draft.task_end_time_Loading = false;
                draft.task_end_time_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;