import { GET_COURSE_REQUEST, GET_COURSE_SUCCESS, GET_COURSE_FAILED, POST_COURSE_REQUEST, POST_COURSE_SUCCESS, POST_COURSE_FAILED, PUT_COURSE_REQUEST, PUT_COURSE_SUCCESS, PUT_COURSE_FAILED, DELETE_COURSE_REQUEST, DELETE_COURSE_SUCCESS, DELETE_COURSE_FAILED } from '../constants/actionTypes';

const initialState = {
	isGettingCourse: false,
	getCourseResp: null,
	getCourseError: null,

	isPostingCourse: false,
	postCourseResp: null,
	postCourseError: null,

    isPuttingCourse: false,
    putCourseResp: null,
    putCourseError: null,

	isDeletingCourse: false,
	deleteCourseResp: null,
	deleteCourseErr: null
}

export default (state = initialState, action) => {
    switch(action.type) {
    	case GET_COURSE_REQUEST:
            return {
                ...state,
                isGettingCourse: true,
                getCourseError: null,
            };
    	case GET_COURSE_SUCCESS:
            return {
                ...state,
                isGettingCourse: false,
                getCourseResp: action.payload,
            };
    	case GET_COURSE_FAILED:
            return {
                ...state,
                isGettingCourse: false,
                getCourseError: action.payload,
            };
    	case POST_COURSE_REQUEST:
            return {
                ...state,
                isPostingCourse: true,
                postCourseError: null,
            };
    	case POST_COURSE_SUCCESS:
            return {
                ...state,
                isPostingCourse: false,
                postCourseResp: action.payload,
            };
    	case POST_COURSE_FAILED:
            return {
                ...state,
                isPostingCourse: false,
                postCourseError: action.payload,
            };

        case PUT_COURSE_REQUEST:
            return {
                ...state,
                isPuttingCourse: true,
                putCourseError: null,
            };
        case PUT_COURSE_SUCCESS:
            return {
                ...state,
                isPuttingCourse: false,
                putCourseResp: action.payload,
            };
        case PUT_COURSE_FAILED:
            return {
                ...state,
                isPuttingCourse: false,
                putCourseError: action.payload,
            };
    	case DELETE_COURSE_REQUEST:
            return {
                ...state,
                isDeletingCourse: true,
                deleteCourseError: null,
            };
    	case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                isDeletingCourse: false,
                deleteCourseResp: action.payload,
            };
    	case DELETE_COURSE_FAILED: 
            return {
                ...state,
                isDeletingCourse: false,
                deleteCourseError: action.paylod,
            };
        default:
            return state;
	}
}