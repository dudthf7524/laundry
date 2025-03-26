import produce from "../util/produce";

export const initialState = {

    taskStart_register_Loading: false,
    taskStart_register_done: false,
    taskStart_register_error: null,

    taskStart_new_one_Loading: false,
    taskStart_new_one_done: false,
    taskStart_new_one_error: null,

    taskStart_date_Loading: false,
    taskStart_date_done: false,
    taskStart_date_error: null,

    taskStartNewOne: null,

    taskStartFilterData: null,
   

};


export const TASKSTART_REGISTER_REQUEST = "TASKSTART_REGISTER_REQUEST";
export const TASKSTART_REGISTER_SUCCESS = "TASKSTART_REGISTER_SUCCESS";
export const TASKSTART_REGISTER_FAILURE = "TASKSTART_REGISTER_FAILURE";

export const TASKSTART_NEW_ONE_REQUEST = "TASKSTART_NEW_ONE_REQUEST";
export const TASKSTART_NEW_ONE_SUCCESS = "TASKSTART_NEW_ONE_SUCCESS";
export const TASKSTART_NEW_ONE_FAILURE = "TASKSTART_NEW_ONE_FAILURE";

export const TASKSTART_DATE_REQUEST = "TASKSTART_DATE_REQUEST";
export const TASKSTART_DATE_SUCCESS = "TASKSTART_DATE_SUCCESS";
export const TASKSTART_DATE_FAILURE = "TASKSTART_DATE_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case TASKSTART_REGISTER_REQUEST:
                draft.taskStart_register_Loading = true;
                draft.taskStart_register_error = null;
                draft.taskStart_register_done = false;
                break;
            case TASKSTART_REGISTER_SUCCESS:
                draft.taskStart_register_Loading = false;
                draft.taskStart_register_done = true;
                break;
            case TASKSTART_REGISTER_FAILURE:
                draft.taskStart_register_Loading = false;
                draft.taskStart_register_error = action.error;
                break;
            case TASKSTART_NEW_ONE_REQUEST:
                draft.taskStart_new_one_Loading = true;
                draft.taskStart_new_one_error = null;
                draft.taskStart_new_one_done = false;
                break;
            case TASKSTART_NEW_ONE_SUCCESS:
                draft.taskStart_new_one_Loading = false;
                draft.taskStartNewOne = action.data
                draft.taskStart_new_one_done = true;
                break;
            case TASKSTART_NEW_ONE_FAILURE:
                draft.taskStart_new_one_Loading = false;
                draft.taskStart_new_one_error = action.error;
                break;
            case TASKSTART_DATE_REQUEST:
                draft.taskStart_date_Loading = true;
                draft.taskStart_date_error = null;
                draft.taskStart_date_done = false;
                break;
            case TASKSTART_DATE_SUCCESS:
                draft.taskStart_date_Loading = false;
                draft.taskStartFilterData = action.data
                draft.taskStart_date_done = true;
                break;
            case TASKSTART_DATE_FAILURE:
                draft.taskStart_date_Loading = false;
                draft.taskStart_date_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;