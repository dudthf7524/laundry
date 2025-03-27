import produce from "../util/produce";

export const initialState = {

    vacation_register_Loading: false,
    vacation_register_done: false,
    vacation_register_error: null,

    vacation_list_Loading: false,
    vacation_list_done: false,
    vacation_list_error: null,

    vacation_allow_Loading: false,
    vacation_allow_done: false,
    vacation_allow_error: null,

    vacation_user_Loading: false,
    vacation_user_done: false,
    vacation_user_error: null,

    vacationLists: null,
    vacationUser: null,

};
export const VACATION_REGISTER_REQUEST = "VACATION_REGISTER_REQUEST";
export const VACATION_REGISTER_SUCCESS = "VACATION_REGISTER_SUCCESS";
export const VACATION_REGISTER_FAILURE = "VACATION_REGISTER_FAILURE";

export const VACATION_LIST_REQUEST = "VACATION_LIST_REQUEST";
export const VACATION_LIST_SUCCESS = "VACATION_LIST_SUCCESS";
export const VACATION_LIST_FAILURE = "VACATION_LIST_FAILURE";

export const VACATION_ALLOW_REQUEST = "VACATION_ALLOW_REQUEST";
export const VACATION_ALLOW_SUCCESS = "VACATION_ALLOW_SUCCESS";
export const VACATION_ALLOW_FAILURE = "VACATION_ALLOW_FAILURE";

export const VACATION_USER_REQUEST = "VACATION_USER_REQUEST";
export const VACATION_USER_SUCCESS = "VACATION_USER_SUCCESS";
export const VACATION_USER_FAILURE = "VACATION_USER_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case VACATION_REGISTER_REQUEST:
                draft.vacation_register_Loading = true;
                draft.vacation_register_error = null;
                draft.vacation_register_done = false;
                break;
            case VACATION_REGISTER_SUCCESS:
                draft.vacation_register_Loading = false;
                draft.vacation_register_done = true;
                break;
            case VACATION_REGISTER_FAILURE:
                draft.vacation_register_Loading = false;
                draft.vacation_register_error = action.error;
                break;
            case VACATION_LIST_REQUEST:
                draft.vacation_list_Loading = true;
                draft.vacation_list_error = null;
                draft.vacation_list_done = false;
                break;
            case VACATION_LIST_SUCCESS:
                draft.vacation_list_Loading = false;
                draft.vacationLists = action.data;
                draft.vacation_list_done = true;
                break;
            case VACATION_LIST_FAILURE:
                draft.vacation_list_Loading = false;
                draft.vacation_list_error = action.error;
                break;
            case VACATION_ALLOW_REQUEST:
                draft.vacation_allow_Loading = true;
                draft.vacation_allow_error = null;
                draft.vacation_allow_done = false;
                break;
            case VACATION_ALLOW_SUCCESS:
                draft.vacation_allow_Loading = false;
                draft.vacationLists = action.data;
                draft.vacation_allow_done = true;
                break;
            case VACATION_ALLOW_FAILURE:
                draft.vacation_allow_Loading = false;
                draft.vacation_allow_error = action.error;
                break;
            case VACATION_USER_REQUEST:
                draft.vacation_user_Loading = true;
                draft.vacation_user_error = null;
                draft.vacation_user_done = false;
                break;
            case VACATION_USER_SUCCESS:
                draft.vacation_user_Loading = false;
                draft.vacationUser = action.data;
                draft.vacation_user_done = true;
                break;
            case VACATION_USER_FAILURE:
                draft.vacation_user_Loading = false;
                draft.vacation_user_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;