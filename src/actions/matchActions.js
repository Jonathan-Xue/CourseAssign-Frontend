import { BASE_URL, MATCH_COURSES_REQUEST, MATCH_COURSES_SUCCESS, MATCH_COURSES_FAILED, MATCH_INSTRUCTORS_REQUEST, MATCH_INSTRUCTORS_SUCCESS, MATCH_INSTRUCTORS_FAILED } from '../constants/actionTypes';
import axios from 'axios';

// Actions
const matchCoursesRequest = () => {
    return {
        type: MATCH_COURSES_REQUEST,
    }
}

const matchCoursesSuccess = (res) => {
    return {
        type: MATCH_COURSES_SUCCESS,
        payload: res,
    }
}

const matchCoursesFailed = (err) => {
    return {
        type: MATCH_COURSES_FAILED,
        payload: err,
    }
}

const matchInstructorsRequest = () => {
    return {
        type: MATCH_INSTRUCTORS_REQUEST,
    }
}

const matchInstructorsSuccess = (res) => {
    return {
        type: MATCH_INSTRUCTORS_SUCCESS,
        payload: res,
    }
}

const matchInstructorsFailed = (err) => {
    return {
        type: MATCH_INSTRUCTORS_FAILED,
        payload: err,
    }
}

// Thunk
// GET: '/matches/course/:courseNo/:courseName''
export const matchInstructorsToCourse = (courseNo, courseName) => dispatch => {
	dispatch(matchInstructorsRequest());

	let body = {
		crossDomain: true
	};

	axios.get(
		BASE_URL + '/matches/course/' + courseNo + '/' + courseName, 
		body
	),then(res => {
		dispatch(matchInstructorsSuccess(res));
	}).catch(err => {
		dispatch(matchInstructorsFailed(err));
	});
	return response;
}

// GET: '/matches/instructor/<instructorId>'
export const matchCoursesToInstructor = (instructorId) => dispatch => {
	dispatch(matchCoursesRequest());

	let body = {
		crossDomain: true
	};

	axios.get(
		BASE_URL + '/matches/instructor/' + instructorId, 
		body
	),then(res => {
		dispatch(matchCoursesSuccess(res));
	}).catch(err => {
		dispatch(matchCoursesFailed(err));
	});
	return response;
}