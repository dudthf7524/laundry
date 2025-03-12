import produce from "../util/produce";

export const initialState = {

    time_register_Loading: false,
    time_register_done: false,
    time_register_error: null,

    time_detail_Loading: false,
    time_detail_done: false,
    time_detail_error: null,

    timeDetail: null,

};


export const TIME_REGISTER_REQUEST = "TIME_REGISTER_REQUEST";
export const TIME_REGISTER_SUCCESS = "TIME_REGISTER_SUCCESS";
export const TIME_REGISTER_FAILURE = "TIME_REGISTER_FAILURE";

export const TIME_DETAIL_REQUEST = "TIME_DETAIL_REQUEST";
export const TIME_DETAIL_SUCCESS = "TIME_DETAIL_SUCCESS";
export const TIME_DETAIL_FAILURE = "TIME_DETAIL_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            case TIME_REGISTER_REQUEST:
                draft.time_register_Loading = true;
                draft.time_register_error = null;
                draft.time_register_done = false;
                break;
            case TIME_REGISTER_SUCCESS:
                draft.time_register_Loading = false;
                draft.time_register_done = true;
                break;
            case TIME_REGISTER_FAILURE:
                draft.time_register_Loading = false;
                draft.time_register_error = action.error;
                break;
            case TIME_DETAIL_REQUEST:
                draft.time_detail_Loading = true;
                draft.time_detail_error = null;
                draft.time_detail_done = false;
                break;
            case TIME_DETAIL_SUCCESS:
                draft.time_detail_Loading = false;
                draft.timeDetail = action.data;
                draft.time_detail_done = true;
                break;
            case TIME_DETAIL_FAILURE:
                draft.time_detail_Loading = false;
                draft.time_detail_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;