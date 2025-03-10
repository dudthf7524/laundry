import produce from "../util/produce";

export const initialState = {
    process_list_Loading: false,
    process_list_done: false,
    process_list_error: null,

    processLists: null

};



export const PROCESS_LIST_REQUEST = "PROCESS_LIST_REQUEST";
export const PROCESS_LIST_SUCCESS = "PROCESS_LIST_SUCCESS";
export const PROCESS_LIST_FAILURE = "PROCESS_LIST_FAILURE";



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case PROCESS_LIST_REQUEST:
                draft.process_list_Loading = true;
                draft.process_list_error = null;
                draft.process_list_done = false;
                break;
            case PROCESS_LIST_SUCCESS:
                draft.process_list_Loading = false;
                draft.processLists = action.data;
                draft.process_list_done = true;
                break;
            case PROCESS_LIST_FAILURE:
                draft.process_list_Loading = false;
                draft.process_list_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;