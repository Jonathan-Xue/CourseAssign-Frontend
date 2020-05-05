import { MATCH_REQUEST, MATCH_SUCCESS, MATCH_FAILED } from '../constants/actionTypes';

const initialState = {
	isMatching: false,
	matchResp: null,
	matchError: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
    	case MATCH_REQUEST:
    		return {
    			...state,
    			isMatching: true,
    			matchError: null,
    		}
    	case MATCH_SUCCESS:
    		return {
    			...state,
    			isMatching: false,
    			matchResp: action.payload,
    		}
    	case MATCH_FAILED:
    		return {
    			...state,
    			isMatching: false,
    			matchError: action.payload,
    		}
        default:
            return state;
    }
}