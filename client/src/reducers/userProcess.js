import produce from "../util/produce";

export const initialState = {

    user_process_register_Loading: false,
    user_process_register_done: false,
    user_process_register_error: null,

};

export const USER_PROCESS_REGISTER_REQUEST = "USER_PROCESS_REGISTER_REQUEST";
export const USER_PROCESS_REGISTER_SUCCESS = "USER_PROCESS_REGISTER_SUCCESS";
export const USER_PROCESS_REGISTER_FAILURE = "USER_PROCESS_REGISTER_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case USER_PROCESS_REGISTER_REQUEST:
                draft.user_process_register_Loading = true;
                draft.user_process_register_error = null;
                draft.user_process_register_done = false;
                break;
            case USER_PROCESS_REGISTER_SUCCESS:
                draft.user_process_register_Loading = false;
                draft.user_process_register_done = true;
                break;
            case USER_PROCESS_REGISTER_FAILURE:
                draft.user_process_register_Loading = false;
                draft.user_process_register_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;