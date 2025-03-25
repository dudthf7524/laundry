import produce from "../util/produce";

export const initialState = {

    companyAddress_register_Loading: false,
    companyAddress_register_done: false,
    companyAddress_register_error: null,

    companyAddress_list_Loading: false,
    companyAddress_list_done: false,
    companyAddress_list_error: null,

    companyAddressLists : null
};


export const COMPANYADDRESS_REGISTER_REQUEST = "COMPANYADDRESS_REGISTER_REQUEST";
export const COMPANYADDRESS_REGISTER_SUCCESS = "COMPANYADDRESS_REGISTER_SUCCESS";
export const COMPANYADDRESS_REGISTER_FAILURE = "COMPANYADDRESS_REGISTER_FAILURE";


export const COMPANYADDRESS_LIST_REQUEST = "COMPANYADDRESS_LIST_REQUEST";
export const COMPANYADDRESS_LIST_SUCCESS = "COMPANYADDRESS_LIST_SUCCESS";
export const COMPANYADDRESS_LIST_FAILURE = "COMPANYADDRESS_LIST_FAILURE";

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            case COMPANYADDRESS_REGISTER_REQUEST:
                draft.companyAddress_register_Loading = true;
                draft.companyAddress_register_error = null;
                draft.companyAddress_register_done = false;
                break;
            case COMPANYADDRESS_REGISTER_SUCCESS:
                draft.companyAddress_register_Loading = false;
                draft.companyAddress_register_done = true;
                break;
            case COMPANYADDRESS_REGISTER_FAILURE:
                draft.companyAddress_register_Loading = false;
                draft.companyAddress_register_error = action.error;
                break;
            case COMPANYADDRESS_LIST_REQUEST:
                draft.companyAddress_list_Loading = true;
                draft.companyAddress_list_error = null;
                draft.companyAddress_list_done = false;
                break;
            case COMPANYADDRESS_LIST_SUCCESS:
                draft.companyAddress_list_Loading = false;
                draft.companyAddressLists = action.data;
                draft.companyAddress_list_done = true;
                break;
            case COMPANYADDRESS_LIST_FAILURE:
                draft.companyAddress_list_Loading = false;
                draft.companyAddress_list_error = action.error;
                break;
            default:
                return state;

        }
    });
};

export default reducer;