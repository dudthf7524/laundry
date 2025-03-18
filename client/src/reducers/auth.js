import produce from "../util/produce";

export const initialState = {

    auth_list_Loading: false,
    auth_list_done: false,
    auth_list_error: null,

    authLists : null

};


export const AUTH_LIST_REQUEST = "AUTH_LIST_REQUEST";
export const AUTH_LIST_SUCCESS = "AUTH_LIST_SUCCESS";
export const AUTH_LIST_FAILURE = "AUTH_LIST_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
         
            case AUTH_LIST_REQUEST:
                draft.auth_list_Loading = true;
                draft.auth_list_error = null;
                draft.auth_list_done = false;
                break;
            case AUTH_LIST_SUCCESS:
                draft.auth_list_Loading = false;
                draft.authLists = action.data;
                draft.auth_list_done = true;
                break;
            case AUTH_LIST_FAILURE:
                draft.auth_list_Loading = false;
                draft.auth_list_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;