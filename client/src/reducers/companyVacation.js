import produce from "../util/produce";

export const initialState = {

    company_vacation_register_Loading: false,
    company_vacation_register_done: false,
    company_vacation_register_error: null,

    company_vacation_list_Loading: false,
    company_vacation_list_done: false,
    company_vacation_list_error: null,

    conpanyVacationLists: null,
   

};
export const COMPANY_VACATION_REGISTER_REQUEST = "COMPANY_VACATION_REGISTER_REQUEST";
export const COMPANY_VACATION_REGISTER_SUCCESS = "COMPANY_VACATION_REGISTER_SUCCESS";
export const COMPANY_VACATION_REGISTER_FAILURE = "VACATION_REGISTER_FAILURE";

export const COMPANY_VACATION_LIST_REQUEST = "COMPANY_VACATION_LIST_REQUEST";
export const COMPANY_VACATION_LIST_SUCCESS = "COMPANY_VACATION_LIST_SUCCESS";
export const COMPANY_VACATION_LIST_FAILURE = "COMPANY_VACATION_LIST_FAILURE";




const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case COMPANY_VACATION_REGISTER_REQUEST:
                draft.company_vacation_register_Loading = true;
                draft.company_vacation_register_error = null;
                draft.company_vacation_register_done = false;
                break;
            case COMPANY_VACATION_REGISTER_SUCCESS:
                draft.company_vacation_register_Loading = false;
                draft.company_vacation_register_done = true;
                break;
            case COMPANY_VACATION_REGISTER_FAILURE:
                draft.company_vacation_register_Loading = false;
                draft.company_vacation_register_error = action.error;
                break;
            case COMPANY_VACATION_LIST_REQUEST:
                draft.company_vacation_list_Loading = true;
                draft.company_vacation_list_error = null;
                draft.company_vacation_list_done = false;
                break;
            case COMPANY_VACATION_LIST_SUCCESS:
                draft.company_vacation_list_Loading = false;
                draft.conpanyVacationLists = action.data;
                draft.company_vacation_list_done = true;
                break;
            case COMPANY_VACATION_LIST_FAILURE:
                draft.company_vacation_list_Loading = false;
                draft.company_vacation_list_error = action.error;
                break;
            default:
                return state;
        }
    });
};

export default reducer;