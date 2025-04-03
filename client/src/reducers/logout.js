import produce from "../util/produce";

export const initialState = {

    logout_Loading: false,
    logout_done: false,
    logout_error: null,

};


export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOGOUT_REQUEST:
                draft.logout_Loading = true;
                draft.logout_error = null;
                draft.logout_done = false;
                break;
            case LOGOUT_SUCCESS:
                draft.logout_Loading = false;
                draft.logout_done = true;
                break;
            case LOGOUT_FAILURE:
                draft.logout_Loading = false;
                draft.logout_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;