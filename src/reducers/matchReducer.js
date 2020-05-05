import { MATCH_COURSES_REQUEST, MATCH_COURSES_SUCCESS, MATCH_COURSES_FAILED, MATCH_INSTRUCTORS_REQUEST, MATCH_INSTRUCTORS_SUCCESS, MATCH_INSTRUCTORS_FAILED } from '../constants/actionTypes';

const initialState = {
	isMatchingCourses: false,
	matchCoursesResp: null,
	matchCoursesError: null,

	isMatchingInstructors: false,
	matchInstructorsResp: null,
	matchInstructorsError: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
    	case MATCH_COURSES_REQUEST:
    		return {
    			...state,
    			isMatchingCourses: true,
    			matchCoursesError: null,
    		}
    	case MATCH_COURSES_SUCCESS:
    		return {
    			...state,
    			isMatchingCourses: false,
    			matchCoursesResp: action.payload,
    		}
    	case MATCH_COURSES_FAILED:
    		return {
    			...state,
    			isMatchingCourses: false,
    			matchCoursesError: action.payload,
    		}
    	case MATCH_INSTRUCTORS_REQUEST:
    		return {
    			...state,
    			isMatchingInstructors: true,
    			matchInstructorsError: null,
    		}
    	case MATCH_INSTRUCTORS_SUCCESS:
    		return {
    			...state,
    			isMatchingInstructors: false,
    			matchInstructorsResp: action.payload,
    		}
    	case MATCH_INSTRUCTORS_FAILED:
    		return {
    			...state,
    			isMatchingInstructors: false,
    			matchInstructorsError: action.payload,
    		}
        default:
            return state;
    }
}