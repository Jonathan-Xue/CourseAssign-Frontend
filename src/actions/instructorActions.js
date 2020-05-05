import { BASE_URL, GET_INSTRUCTOR_REQUEST, GET_INSTRUCTOR_SUCCESS, GET_INSTRUCTOR_FAILED, POST_INSTRUCTOR_REQUEST, POST_INSTRUCTOR_SUCCESS, POST_INSTRUCTOR_FAILED, PUT_INSTRUCTOR_REQUEST, PUT_INSTRUCTOR_SUCCESS, PUT_INSTRUCTOR_FAILED, DELETE_INSTRUCTOR_REQUEST, DELETE_INSTRUCTOR_SUCCESS, DELETE_INSTRUCTOR_FAILED } from '../constants/actionTypes';
import axios from 'axios';

// Actions
const getInstructorRequest = () => {
    return {
        type: INSTRUCTOR_REQUEST,
    }
}

const getInstructorSuccess = (res) => {
    return {
        type: GET_INSTRUCTOR_SUCCESS,
        payload: res,
    }
}

const getInstructorFailed = (err) => {
    return {
        type: GET_INSTRUCTOR_FAILED,
        payload: err,
    }
}

const postInstructorRequest = () => {
    return {
        type: POST_INSTRUCTOR_REQUEST,
    }
}

const postInstructorSuccess = (res) => {
    return {
        type: POST_INSTRUCTOR_SUCCESS,
        payload: res,
    }
}

const postInstructorFailed = (err) => {
    return {
        type: POST_INSTRUCTOR_FAILED,
        payload: err,
    }
}

const putInstructorRequest = () => {
    return {
        type: PUT_INSTRUCTOR_REQUEST,
    }
}

const putInstructorSuccess = (res) => {
    return {
        type: PUT_INSTRUCTOR_SUCCESS,
        payload: res,
    }
}

const putInstructorFailed = (err) => {
    return {
        type: PUT_INSTRUCTOR_FAILED,
        payload: err,
    }
}

const deleteInstructorRequest = () => {
    return {
        type: DELETE_INSTRUCTOR_REQUEST,
    }
}

const deleteInstructorSuccess = (res) => {
    return {
        type: DELETE_INSTRUCTOR_SUCCESS,
        payload: res,
    }
}

const deleteInstructorFailed = (err) => {
    return {
        type: DELETE_INSTRUCTOR_FAILED,
        payload: err,
    }
}

// Thunk
// GET: '/instructors'
export const getInstructors = () => dispatch => {
    dispatch(getInstructorRequest());

    let body = {
        crossDomain: true
    };

    axios.get(
        BASE_URL + '/instructors', 
        body
    ),then(res => {
        dispatch(getInstructorSuccess(res));
    }).catch(err => {
        dispatch(getInstructorFailed(err));
    });
    return response;
}

// POST: '/instructors'
export const createInstructor = (instructorName, researchInterests) => dispatch => {
    dispatch(postInstructorRequest());

    let body = {
        instructorName: instructorName,
        researchInterests: researchInterests,
        crossDomain: true
    }

    axios.post(
        BASE_URL + '/instructors', 
        body
    ),then(res => {
        dispatch(postInstructorSuccess(res));
    }).catch(err => {
        dispatch(postInstructorFailed(err));
    });
}

// PUT: '/instructors/:instructorId'
export const updateInstructor = (instructorId, instructorName, researchInterests) => dispatch => {
    dispatch(putInstructorRequest());
    
    let body = {
        instructorName: instructorName,
        researchInterests: researchInterests,
        crossDomain: true
    }

    axios.put(
        BASE_URL + '/instructors/' + instructorId,
        body
    ).then(res => {
        dispatch(putInstructorSuccess(res));
    }).catch(err => {
        dispatch(putInstructorFailed(err));
    });
}

// DELETE: '/courses/:courseNo/:courseName'
export const deleteInstructor = (instructorId, instructorName, researchInterests) => dispatch => {
    dispatch(deleteInstructorRequest());

    let body = {
        crossDomain: true
    }

    axios.delete(
        BASE_URL + '/instructors/' + instructorId, 
        body
    ).then(res => {
        dispatch(deleteInstructorSuccess(res));
    }).catch(err => {
        dispatch(deleteInstructorFailed(err));
    });
}