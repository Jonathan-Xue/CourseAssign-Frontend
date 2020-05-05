import { GET_ENTRY_REQUEST, GET_ENTRY_SUCCESS, GET_ENTRY_FAILED, POST_ENTRY_REQUEST, POST_ENTRY_SUCCESS, POST_ENTRY_FAILED, DELETE_ENTRY_REQUEST, DELETE_ENTRY_SUCCESS, DELETE_ENTRY_FAILED } from '../constants/actionTypes';

const initialState = {
	isGettingEntry: false,
	getEntryResp: null,
	getEntryError: null,

	isPostingEntry: false,
	postEntryResp: null,
	postEntryError: null,

	isDeletingEntry: false,
	deleteEntryResp: null,
	deleteEntryErr: null
}

export default (state = initialState, action) => {
    switch(action.type) {
    	case GET_ENTRY_REQUEST:
            return {
                ...state,
                isGettingEntry: true,
                getEntryError: null,
            };
    	case GET_ENTRY_SUCCESS:
            return {
                ...state,
                isGettingEntry: false,
                getEntryResp: action.payload,
            };
    	case GET_ENTRY_FAILED:
            return {
                ...state,
                isGettingEntry: false,
                getEntryError: action.payload,
            };
    	case POST_ENTRY_REQUEST:
            return {
                ...state,
                isPostingEntry: true,
                postEntryError: null,
            };
    	case POST_ENTRY_SUCCESS:
            return {
                ...state,
                isPostingEntry: false,
                postEntryResp: action.payload,
            };
    	case POST_ENTRY_FAILED:
            return {
                ...state,
                isPostingEntry: false,
                postEntryError: action.payload,
            };
    	case DELETE_ENTRY_REQUEST:
            return {
                ...state,
                isDeletingEntry: true,
                deleteEntryError: null,
            };
    	case DELETE_ENTRY_SUCCESS:
            return {
                ...state,
                isDeletingEntry: false,
                deleteEntryResp: action.payload,
            };
    	case DELETE_ENTRY_FAILED: 
            return {
                ...state,
                isDeletingEntry: false,
                deleteEntryError: action.paylod,
            };
        default:
            return state;
	}
}