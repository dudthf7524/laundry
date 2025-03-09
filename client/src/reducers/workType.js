import produce from "../util/produce";

export const initialState = {

    workType_register_Loading: false,
    workType_register_done: false,
    workType_register_error: null,

    workType_list_Loading: false,
    workType_list_done: false,
    workType_list_error: null,

    workTypeLists : null,
};

export const WORKTYPE_REGISTER_REQUEST = "WORKTYPE_REGISTER_REQUEST";
export const WORKTYPE_REGISTER_SUCCESS = "WORKTYPE_REGISTER_SUCCESS";
export const WORKTYPE_REGISTER_FAILURE = "WORKTYPE_REGISTER_FAILURE";

export const WORKTYPE_LIST_REQUEST = "WORKTYPE_LIST_REQUEST";
export const WORKTYPE_LIST_SUCCESS = "WORKTYPE_LIST_SUCCESS";
export const WORKTYPE_LIST_FAILURE = "WORKTYPE_LIST_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case WORKTYPE_REGISTER_REQUEST:
                draft.workType_register_Loading = true;
                draft.workType_register_error = null;
                draft.workType_register_done = false;
                break;
            case WORKTYPE_REGISTER_SUCCESS:
                draft.workType_register_Loading = false;
                draft.workType_register_done = true;
                break;
            case WORKTYPE_REGISTER_FAILURE:
                draft.workType_register_Loading = false;
                draft.workType_register_error = action.error;
                break;
            case WORKTYPE_LIST_REQUEST:
                draft.workType_list_Loading = true;
                draft.workType_list_error = null;
                draft.workType_list_done = false;
                break;
            case WORKTYPE_LIST_SUCCESS:
                draft.workType_list_Loading = false;
                draft.workTypeLists = action.data;
                draft.workType_list_done = true;
                break;
            case WORKTYPE_LIST_FAILURE:
                draft.workType_list_Loading = false;
                draft.workType_list_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;