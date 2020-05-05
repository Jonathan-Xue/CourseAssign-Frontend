import { GET_INSTRUCTOR_REQUEST, GET_INSTRUCTOR_SUCCESS, GET_INSTRUCTOR_FAILED, POST_INSTRUCTOR_REQUEST, POST_INSTRUCTOR_SUCCESS, POST_INSTRUCTOR_FAILED, PUT_INSTRUCTOR_REQUEST, PUT_INSTRUCTOR_SUCCESS, PUT_INSTRUCTOR_FAILED, DELETE_INSTRUCTOR_REQUEST, DELETE_INSTRUCTOR_SUCCESS, DELETE_INSTRUCTOR_FAILED } from '../constants/actionTypes';

const initialState = {
	isGettingInstructor: false,
	getInstructorResp: null,
	getInstructorError: null,

	isPostingInstructor: false,
	postInstructorResp: null,
	postInstructorError: null,

    isPuttingInstructor: false,
    putInstructorResp: null,
    putInstructorError: null,

	isDeletingInstructor: false,
	deleteInstructorResp: null,
	deleteInstructorErr: null
}

export default (state = initialState, action) => {
    switch(action.type) {
    	case GET_INSTRUCTOR_REQUEST:
            return {
                ...state,
                isGettingInstructor: true,
                getInstructorError: null,
            };
    	case GET_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                isGettingInstructor: false,
                getInstructorResp: action.payload,
            };
    	case GET_INSTRUCTOR_FAILED:
            return {
                ...state,
                isGettingInstructor: false,
                getInstructorError: action.payload,
            };
    	case POST_INSTRUCTOR_REQUEST:
            return {
                ...state,
                isPostingInstructor: true,
                postInstructorError: null,
            };
    	case POST_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                isPostingInstructor: false,
                postInstructorResp: action.payload,
            };
    	case POST_INSTRUCTOR_FAILED:
            return {
                ...state,
                isPostingInstructor: false,
                postInstructorError: action.payload,
            };

        case PUT_INSTRUCTOR_REQUEST:
            return {
                ...state,
                isPuttingInstructor: true,
                putInstructorError: null,
            };
        case PUT_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                isPuttingInstructor: false,
                putInstructorResp: action.payload,
            };
        case PUT_INSTRUCTOR_FAILED:
            return {
                ...state,
                isPuttingInstructor: false,
                putInstructorError: action.payload,
            };
    	case DELETE_INSTRUCTOR_REQUEST:
            return {
                ...state,
                isDeletingInstructor: true,
                deleteInstructorError: null,
            };
    	case DELETE_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                isDeletingInstructor: false,
                deleteInstructorResp: action.payload,
            };
    	case DELETE_INSTRUCTOR_FAILED: 
            return {
                ...state,
                isDeletingInstructor: false,
                deleteInstructorError: action.paylod,
            };
        default:
            return state;
	}
}