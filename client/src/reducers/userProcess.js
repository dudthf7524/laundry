import produce from "../util/produce";

export const initialState = {

    user_process_register_Loading: false,
    user_process_register_done: false,
    user_process_register_error: null,

    user_process_list_Loading: false,
    user_process_list_done: false,
    user_process_list_error: null,

    user_process_one_list_Loading: false,
    user_process_one_list_done: false,
    user_process_one_list_error: null,

    user_process_delete_Loading: false,
    user_process_delete_done: false,
    user_process_delete_error: null,

    userProcessLists: null,
    userProcessOneLists: null,

};

export const USER_PROCESS_REGISTER_REQUEST = "USER_PROCESS_REGISTER_REQUEST";
export const USER_PROCESS_REGISTER_SUCCESS = "USER_PROCESS_REGISTER_SUCCESS";
export const USER_PROCESS_REGISTER_FAILURE = "USER_PROCESS_REGISTER_FAILURE";

export const USER_PROCESS_LIST_REQUEST = "USER_PROCESS_LIST_REQUEST";
export const USER_PROCESS_LIST_SUCCESS = "USER_PROCESS_LIST_SUCCESS";
export const USER_PROCESS_LIST_FAILURE = "USER_PROCESS_LIST_FAILURE";

export const USER_PROCESS_ONE_LIST_REQUEST = "USER_PROCESS_ONE_LIST_REQUEST";
export const USER_PROCESS_ONE_LIST_SUCCESS = "USER_PROCESS_ONE_LIST_SUCCESS";
export const USER_PROCESS_ONE_LIST_FAILURE = "USER_PROCESS_ONE_LIST_FAILURE";

export const USER_PROCESS_DELETE_REQUEST = "USER_PROCESS_DELETE_REQUEST";
export const USER_PROCESS_DELETE_SUCCESS = "USER_PROCESS_DELETE_SUCCESS";
export const USER_PROCESS_DELETE_FAILURE = "USER_PROCESS_DELETE_FAILURE";


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
            case USER_PROCESS_LIST_REQUEST:
                draft.user_process_list_Loading = true;
                draft.user_process_list_error = null;
                draft.user_process_list_done = false;
                break;
            case USER_PROCESS_LIST_SUCCESS:
                draft.user_process_list_Loading = false;
                draft.userProcessLists = action.data
                draft.user_process_list_done = true;
                break;
            case USER_PROCESS_LIST_FAILURE:
                draft.user_process_list_Loading = false;
                draft.user_process_list_error = action.error;
                break
            case USER_PROCESS_ONE_LIST_REQUEST:
                draft.user_process_one_list_Loading = true;
                draft.user_process_one_list_error = null;
                draft.user_process_one_list_done = false;
                break;
            case USER_PROCESS_ONE_LIST_SUCCESS:
                draft.user_process_one_list_Loading = false;
                draft.userProcessOneLists = action.data
                draft.user_process_one_list_done = true;
                break;
            case USER_PROCESS_ONE_LIST_FAILURE:
                draft.user_process_one_list_Loading = false;
                draft.user_process_one_list_error = action.error;
                break;
            case USER_PROCESS_DELETE_REQUEST:
                draft.user_process_delete_Loading = true;
                draft.user_process_delete_error = null;
                draft.user_process_delete_done = false;
                break;
            case USER_PROCESS_DELETE_SUCCESS:
                draft.user_process_delete_Loading = false;
                draft.user_process_delete_done = true;
                break;
            case USER_PROCESS_DELETE_FAILURE:
                draft.user_process_delete_Loading = false;
                draft.user_process_delete_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;