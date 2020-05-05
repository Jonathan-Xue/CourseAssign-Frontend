import { BASE_URL, MATCH_REQUEST, MATCH_SUCCESS, MATCH_FAILED } from '../constants/actionTypes';
import axios from 'axios';

// Actions
const matchRequest = () => {
    return {
        type: MATCH_REQUEST,
    }
}

const matchSuccess = (res) => {
    return {
        type: MATCH_SUCCESS,
        payload: res,
    }
}

const matchFailed = (err) => {
    return {
        type: MATCH_FAILED,
        payload: err,
    }
}

// Thunk
// GET: '/matches/course/:courseNo/:courseName''
export const matchInstructorsToCourse = (courseNo, courseName) => dispatch => {
	dispatch(matchRequest());

	let body = {
		crossDomain: true
	};

	axios.get(
		BASE_URL + '/matches/course/' + courseNo + '/' + courseName, 
		body
	).then(res => {
		dispatch(matchSuccess(res.data.data));
	}).catch(err => {
		dispatch(matchFailed(err));
	});
}

// GET: '/matches/instructor/<instructorId>'
export const matchCoursesToInstructor = (instructorId) => dispatch => {
	dispatch(matchRequest());

	let body = {
		crossDomain: true
	};

	axios.get(
		BASE_URL + '/matches/instructor/' + instructorId, 
		body
	).then(res => {
		dispatch(matchSuccess(res.data.data));
	}).catch(err => {
		dispatch(matchFailed(err));
	});
}