import produce from "../util/produce";

export const initialState = {

    user_join_Loading: false,
    user_join_done: false,
    user_join_error: null,

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

    user_check_id_Loading: false,
    user_check_id_done: false,
    user_check_id_error: null,

    user_change_id_Loading: false,
    user_change_id_done: false,
    user_change_id_error: null,

    user_check_password_Loading: false,
    user_check_password_done: false,
    user_check_password_error: null,

    user_change_password_Loading: false,
    user_change_password_done: false,
    user_change_password_error: null,

    user_information_Loading: false,
    user_information_done: false,
    user_information_error: null,

    user_delete_Loading: false,
    user_delete_done: false,
    user_delete_error: null,

    login: null,

    loginFailure: null,

    user: null,

    userLists: null,

    userUpdates: null,

    userCheckId: null,

    userCheckPassword: null,

    userChangeId: null,

    userChangePassword: null,

    userInformation: null,

};


export const USER_JOIN_REQUEST = "USER_JOIN_REQUEST";
export const USER_JOIN_SUCCESS = "USER_JOIN_SUCCESS";
export const USER_JOIN_FAILURE = "USER_JOIN_FAILURE";

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

export const USER_CHECK_ID_REQUEST = "USER_CHECK_ID_REQUEST";
export const USER_CHECK_ID_SUCCESS = "USER_CHECK_ID_SUCCESS";
export const USER_CHECK_ID_FAILURE = "USER_CHECK_ID_FAILURE";

export const USER_CHANGE_ID_REQUEST = "USER_CHANGE_ID_REQUEST";
export const USER_CHANGE_ID_SUCCESS = "USER_CHANGE_ID_SUCCESS";
export const USER_CHANGE_ID_FAILURE = "USER_CHANGE_ID_FAILURE";

export const USER_CHECK_PASSWORD_REQUEST = "USER_CHECK_PASSWORD_REQUEST";
export const USER_CHECK_PASSWORD_SUCCESS = "USER_CHECK_PASSWORD_SUCCESS";
export const USER_CHECK_PASSWORD_FAILURE = "USER_CHECK_PASSWORD_FAILURE";

export const USER_CHANGE_PASSWORD_REQUEST = "USER_CHANGE_PASSWORD_REQUEST";
export const USER_CHANGE_PASSWORD_SUCCESS = "USER_CHANGE_PASSWORD_SUCCESS";
export const USER_CHANGE_PASSWORD_FAILURE = "USER_CHANGE_PASSWORD_FAILURE";

export const USER_INFORMATION_REQUEST = "USER_INFORMATION_REQUEST";
export const USER_INFORMATION_SUCCESS = "USER_INFORMATION_SUCCESS";
export const USER_INFORMATION_FAILURE = "USER_INFORMATION_FAILURE";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";

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
            case USER_CHECK_ID_REQUEST:
                draft.user_check_id_Loading = true;
                draft.user_check_id_error = null;
                draft.user_check_id_done = false;
                break;
            case USER_CHECK_ID_SUCCESS:
                draft.user_check_id_Loading = false;
                draft.userCheckId = action.data;
                draft.user_check_id_done = true;
                break;
            case USER_CHECK_ID_FAILURE:
                draft.user_check_id_Loading = false;
                draft.user_check_id_error = action.error;
                break;
            case USER_CHECK_PASSWORD_REQUEST:
                draft.user_check_password_Loading = true;
                draft.user_check_password_error = null;
                draft.user_check_password_done = false;
                break;
            case USER_CHECK_PASSWORD_SUCCESS:
                draft.user_check_password_Loading = false;
                draft.userCheckPassword = action.data;
                draft.user_check_password_done = true;
                break;
            case USER_CHECK_PASSWORD_FAILURE:
                draft.user_check_id_Loading = false;
                draft.user_check_id_error = action.error;
                break;
            case USER_CHANGE_ID_REQUEST:
                draft.user_change_id_Loading = true;
                draft.user_change_id_error = null;
                draft.user_change_id_done = false;
                break;
            case USER_CHANGE_ID_SUCCESS:
                draft.user_change_id_Loading = false;
                draft.userChangeId = action.data;
                draft.user_change_id_done = true;
                break;
            case USER_CHANGE_ID_FAILURE:
                draft.user_change_id_Loading = false;
                draft.user_change_id_error = action.error;
                break;
            case USER_CHANGE_PASSWORD_REQUEST:
                draft.user_change_password_Loading = true;
                draft.user_change_password_error = null;
                draft.user_change_password_done = false;
                break;
            case USER_CHANGE_PASSWORD_SUCCESS:
                draft.user_change_password_Loading = false;
                draft.userChangePassword = action.data;
                draft.user_change_password_done = true;
                break;
            case USER_CHANGE_PASSWORD_FAILURE:
                draft.user_change_password_Loading = false;
                draft.user_change_password_error = action.error;
                break;
            case USER_INFORMATION_REQUEST:
                draft.user_information_Loading = true;
                draft.user_information_error = null;
                draft.user_information_done = false;
                break;
            case USER_INFORMATION_SUCCESS:
                draft.user_information_Loading = false;
                draft.userInformation = action.data;
                draft.user_information_done = true;
                break;
            case USER_INFORMATION_FAILURE:
                draft.user_information_Loading = false;
                draft.user_information_error = action.error;
                break;
            case USER_DELETE_REQUEST:
                draft.user_delete_Loading = true;
                draft.user_delete_error = null;
                draft.user_delete_done = false;
                break;
            case USER_DELETE_SUCCESS:
                draft.user_delete_Loading = false;
                draft.user_delete_done = true;
                break;
            case USER_DELETE_FAILURE:
                draft.user_delete_Loading = false;
                draft.user_delete_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;