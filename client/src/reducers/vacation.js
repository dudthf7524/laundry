import produce from "../util/produce";

export const initialState = {

    vacation_register_Loading: false,
    vacation_register_done: false,
    vacation_register_error: null,

};
export const VACATION_REGISTER_REQUEST = "VACATION_REGISTER_REQUEST";
export const VACATION_REGISTER_SUCCESS = "VACATION_REGISTER_SUCCESS";
export const VACATION_REGISTER_FAILURE = "VACATION_REGISTER_FAILURE";

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
            default:
                return state;
        }
    });
};

export default reducer;