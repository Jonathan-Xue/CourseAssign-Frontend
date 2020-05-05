import { BASE_URL, GET_COURSE_REQUEST, GET_COURSE_SUCCESS, GET_COURSE_FAILED, POST_COURSE_REQUEST, POST_COURSE_SUCCESS, POST_COURSE_FAILED, PUT_COURSE_REQUEST, PUT_COURSE_SUCCESS, PUT_COURSE_FAILED, DELETE_COURSE_REQUEST, DELETE_COURSE_SUCCESS, DELETE_COURSE_FAILED } from '../constants/actionTypes';
import axios from 'axios';

// Actions
const getCourseRequest = () => {
    return {
        type: GET_COURSE_REQUEST,
    }
}

const getCourseSuccess = (res) => {
    return {
        type: GET_COURSE_SUCCESS,
        payload: res,
    }
}

const getCourseFailed = (err) => {
    return {
        type: GET_COURSE_FAILED,
        payload: err,
    }
}

const postCourseRequest = () => {
    return {
        type: POST_COURSE_REQUEST,
    }
}

const postCourseSuccess = (res) => {
    return {
        type: POST_COURSE_SUCCESS,
        payload: res,
    }
}

const postCourseFailed = (err) => {
    return {
        type: POST_COURSE_FAILED,
        payload: err,
    }
}

const putCourseRequest = () => {
    return {
        type: PUT_COURSE_REQUEST,
    }
}

const putCourseSuccess = (res) => {
    return {
        type: PUT_COURSE_SUCCESS,
        payload: res,
    }
}

const putCourseFailed = (err) => {
    return {
        type: PUT_COURSE_FAILED,
        payload: err,
    }
}

const deleteCourseRequest = () => {
    return {
        type: DELETE_COURSE_REQUEST,
    }
}

const deleteCourseSuccess = (res) => {
    return {
        type: DELETE_COURSE_SUCCESS,
        payload: res,
    }
}

const deleteCourseFailed = (err) => {
    return {
        type: DELETE_COURSE_FAILED,
        payload: err,
    }
}


// Thunk
// GET: '/courses'
export const getCourses = () => dispatch => {
	dispatch(getCourseRequest());

	let body = {
		crossDomain: true
	};

	axios.get(
		BASE_URL + '/courses', 
		body
	).then(res => {
		dispatch(getCourseSuccess(res.data.data));
	}).catch(err => {
		dispatch(getCourseFailed(err));
	});
}

// POST: '/courses'
export const createCourse = (courseNo, courseName, courseDesc) => dispatch => {
	dispatch(postCourseRequest());

	let body = {
		courseNo: courseNo,
		courseName: courseName,
		courseDesc: courseDesc,
		crossDomain: true
	}

	axios.post(
		BASE_URL + '/courses', 
		body
	).then(res => {
		dispatch(postCourseSuccess(res));
	}).catch(err => {
		dispatch(postCourseFailed(err));
	});
}

// PUT: '/courses/:courseNo/:courseName'
export const updateCourse = (courseNo, courseName, courseDesc) => dispatch => {
	dispatch(putCourseRequest());
	
	let body = {
		courseDesc: courseDesc,
		crossDomain: true
	}

	axios.put(
		BASE_URL + '/courses/' + courseNo + '/' + courseName, 
		body
	).then(res => {
		dispatch(putCourseSuccess(res));
	}).catch(err => {
		dispatch(putCourseFailed(err));
	});
}

// DELETE: '/courses/:courseNo/:courseName'
export const deleteCourse = (courseNo, courseName) => dispatch => {
	dispatch(deleteCourseRequest());

	let body = {
		crossDomain: true
	}

	axios.delete(
		BASE_URL + '/courses/' + courseNo + '/' + courseName, 
		body
	).then(res => {
		dispatch(deleteCourseSuccess(res));
	}).catch(err => {
		dispatch(deleteCourseFailed(err));
	});
}