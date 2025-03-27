import produce from "../util/produce";

export const initialState = {


    user_login_Loading: false,
    user_login_done: false,
    user_login_error: null,

    user_auth_Loading: false,
    user_auth_done: false,
    user_auth_error: null,

    user_list_Loading: false,
    user_list_done: false,
    user_list_error: null,

    user_update_Loading: false,
    user_update_done: false,
    user_update_error: null,

    user_auth_update_Loading: false,
    user_auth_update_done: false,
    user_auth_update_error: null,

    login: null,

    user: null,

    userLists: null,

    userUpdates: null

};

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_AUTH_REQUEST = "USER_AUTH_REQUEST";
export const USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS";
export const USER_AUTH_FAILURE = "USER_AUTH_FAILURE";

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAILURE = "USER_LIST_FAILURE";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";

export const USER_AUTH_UPDATE_REQUEST = "USER_AUTH_UPDATE_REQUEST";
export const USER_AUTH_UPDATE_SUCCESS = "USER_AUTH_UPDATE_SUCCESS";
export const USER_AUTH_UPDATE_FAILURE = "USER_AUTH_UPDATE_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case USER_LOGIN_REQUEST:
                draft.user_login_Loading = true;
                draft.user_login_error = null;
                draft.user_login_done = false;
                break;
            case USER_LOGIN_SUCCESS:
                draft.user_login_Loading = false;
                draft.login = action.data;
                draft.user_login_done = true;
                break;
            case USER_LOGIN_FAILURE:
                draft.user_login_Loading = false;
                draft.user_login_error = action.error;
                break;
            case USER_AUTH_REQUEST:
                draft.user_auth_Loading = true;
                draft.user_auth_error = null;
                draft.user_auth_done = false;
                break;
            case USER_AUTH_SUCCESS:
                draft.user_auth_Loading = false;
                draft.user = action.data;
                draft.user_auth_done = true;
                break;
            case USER_AUTH_FAILURE:
                draft.user_auth_Loading = false;
                draft.user_auth_error = action.error;
                break;
            case USER_LIST_REQUEST:
                draft.user_list_Loading = true;
                draft.user_list_error = null;
                draft.user_list_done = false;
                break;
            case USER_LIST_SUCCESS:
                draft.user_list_Loading = false;
                draft.userLists = action.data;
                draft.user_list_done = true;
                break;
            case USER_LIST_FAILURE:
                draft.user_list_Loading = false;
                draft.user_list_error = action.error;
                break;
            case USER_UPDATE_REQUEST:
                draft.user_update_Loading = true;
                draft.user_update_error = null;
                draft.user_update_done = false;
                break;
            case USER_UPDATE_SUCCESS:
                draft.user_update_Loading = false;
                draft.userUpdates = action.data;
                draft.user_update_done = true;
                break;
            case USER_UPDATE_FAILURE:
                draft.user_update_Loading = false;
                draft.user_update_error = action.error;
                break;
            case USER_AUTH_UPDATE_REQUEST:
                draft.user_auth_update_Loading = true;
                draft.user_auth_update_error = null;
                draft.user_auth_update_done = false;
                break;
            case USER_AUTH_UPDATE_SUCCESS:
                draft.user_auth_update_Loading = false;
                draft.user_auth_update_done = true;
                break;
            case USER_AUTH_UPDATE_FAILURE:
                draft.user_auth_update_Loading = false;
                draft.user_auth_update_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;