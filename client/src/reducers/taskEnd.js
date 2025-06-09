import produce from "../util/produce";

export const initialState = {

    taskEnd_register_Loading: false,
    taskEnd_register_done: false,
    taskEnd_register_error: null,

    taskEnd_register_admin_Loading: false,
    taskEnd_register_admin_done: false,
    taskEnd_register_admin_error: null,
};

export const TASKEND_REGISTER_REQUEST = "TASKEND_REGISTER_REQUEST";
export const TASKEND_REGISTER_SUCCESS = "TASKEND_REGISTER_SUCCESS";
export const TASKEND_REGISTER_FAILURE = "TASKEND_REGISTER_FAILURE";

export const TASKEND_REGISTER_ADMIN_REQUEST = "TASKEND_REGISTER_ADMIN_REQUEST";
export const TASKEND_REGISTER_ADMIN_SUCCESS = "TASKEND_REGISTER_ADMIN_SUCCESS";
export const TASKEND_REGISTER_ADMIN_FAILURE = "TASKEND_REGISTER_ADMIN_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case TASKEND_REGISTER_REQUEST:
                draft.taskEnd_register_Loading = true;
                draft.taskEnd_register_error = null;
                draft.taskEnd_register_done = false;
                break;
            case TASKEND_REGISTER_SUCCESS:
                draft.taskEnd_register_Loading = false;
                draft.taskEnd_register_done = true;
                break;
            case TASKEND_REGISTER_FAILURE:
                draft.taskEnd_register_Loading = false;
                draft.taskEnd_register_error = action.error;
                break;
            case TASKEND_REGISTER_ADMIN_REQUEST:
                draft.taskEnd_register_admin_Loading = true;
                draft.taskEnd_register_admin_error = null;
                draft.taskEnd_register_admin_done = false;
                break;
            case TASKEND_REGISTER_ADMIN_SUCCESS:
                draft.taskEnd_register_admin_Loading = false;
                draft.taskEnd_register_admin_done = true;
                break;
            case TASKEND_REGISTER_ADMIN_FAILURE:
                draft.taskEnd_register_admin_Loading = false;
                draft.taskEnd_register_admin_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;