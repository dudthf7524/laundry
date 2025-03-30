import produce from "../util/produce";

export const initialState = {

    notice_list_Loading: false,
    notice_list_done: false,
    notice_list_error: null,

    notice_update_Loading: false,
    notice_update_done: false,
    notice_update_error: null,

    noticeLists: null

};


export const NOTICE_LIST_REQUEST = "NOTICE_LIST_REQUEST";
export const NOTICE_LIST_SUCCESS = "NOTICE_LIST_SUCCESS";
export const NOTICE_LIST_FAILURE = "NOTICE_LIST_FAILURE";

export const NOTICE_UPDATE_REQUEST = "NOTICE_UPDATE_REQUEST";
export const NOTICE_UPDATE_SUCCESS = "NOTICE_UPDATE_SUCCESS";
export const NOTICE_UPDATE_FAILURE = "NOTICE_UPDATE_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            case NOTICE_LIST_REQUEST:
                draft.notice_list_Loading = true;
                draft.notice_list_error = null;
                draft.notice_list_done = false;
                break;
            case NOTICE_LIST_SUCCESS:
                draft.notice_list_Loading = false;
                draft.noticeLists = action.data;
                draft.notice_list_done = true;
                break;
            case NOTICE_LIST_FAILURE:
                draft.notice_list_Loading = false;
                draft.notice_list_error = action.error;
                break;

            case NOTICE_UPDATE_REQUEST:
                draft.notice_update_Loading = true;
                draft.notice_update_error = null;
                draft.notice_update_done = false;
                break;
            case NOTICE_UPDATE_SUCCESS:
                draft.notice_update_Loading = false;
                draft.notice_update_done = true;
                break;
            case NOTICE_UPDATE_FAILURE:
                draft.notice_update_Loading = false;
                draft.notice_update_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;