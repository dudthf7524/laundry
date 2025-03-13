import produce from "../util/produce";

export const initialState = {

    work_register_Loading: false,
    work_register_done: false,
    work_register_error: null,

    work_new_one_Loading: false,
    work_new_one_done: false,
    work_new_one_error: null,

    work_end_time_Loading: false,
    work_end_time_done: false,
    work_end_time_error: null,

    workNewOne: null

};


export const WORK_REGISTER_REQUEST = "WORK_REGISTER_REQUEST";
export const WORK_REGISTER_SUCCESS = "WORK_REGISTER_SUCCESS";
export const WORK_REGISTER_FAILURE = "WORK_REGISTER_FAILURE";

export const WORK_NEW_ONE_REQUEST = "WORK_NEW_ONE_REQUEST";
export const WORK_NEW_ONE_SUCCESS = "WORK_NEW_ONE_SUCCESS";
export const WORK_NEW_ONE_FAILURE = "WORK_NEW_ONE_FAILURE";


export const WORK_END_TIME_REQUEST = "WORK_END_TIME_REQUEST";
export const WORK_END_TIME_SUCCESS = "WORK_END_TIME_SUCCESS";
export const WORK_END_TIME_FAILURE = "WORK_END_TIME_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case WORK_REGISTER_REQUEST:
                draft.work_register_Loading = true;
                draft.work_register_error = null;
                draft.work_register_done = false;
                break;
            case WORK_REGISTER_SUCCESS:
                draft.work_register_Loading = false;
                draft.work_register_done = true;
                break;
            case WORK_REGISTER_FAILURE:
                draft.work_register_Loading = false;
                draft.work_register_error = action.error;
                break;
            case WORK_NEW_ONE_REQUEST:
                draft.work_new_one_Loading = true;
                draft.work_new_one_error = null;
                draft.work_new_one_done = false;
                break;
            case WORK_NEW_ONE_SUCCESS:
                draft.work_new_one_Loading = false;
                draft.workNewOne = action.data
                draft.work_new_one_done = true;
                break;
            case WORK_NEW_ONE_FAILURE:
                draft.work_new_one_Loading = false;
                draft.work_new_one_error = action.error;
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