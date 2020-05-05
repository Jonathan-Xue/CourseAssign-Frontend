import { GET_INSTRUCTOR_REQUEST, GET_INSTRUCTOR_SUCCESS, GET_INSTRUCTOR_FAILED, POST_INSTRUCTOR_REQUEST, POST_INSTRUCTOR_SUCCESS, POST_INSTRUCTOR_FAILED, PUT_INSTRUCTOR_REQUEST, PUT_INSTRUCTOR_SUCCESS, PUT_INSTRUCTOR_FAILED, DELETE_INSTRUCTOR_REQUEST, DELETE_INSTRUCTOR_SUCCESS, DELETE_INSTRUCTOR_FAILED } from '../constants/actionTypes';
import { config } from '../constants/config';
import axios from 'axios';

// Actions
const getInstructorRequest = () => {
    return {
        type: GET_INSTRUCTOR_REQUEST,
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
export const getInstructors = () => dispatch => new Promise((resolve, reject) => {
    dispatch(getInstructorRequest());

    let body = {
        crossDomain: true
    };

    axios.get(
        config.API_URL + '/instructors', 
        body
    ).then(res => {
        dispatch(getInstructorSuccess(res.data.data));
        resolve(res.data.data);
    }).catch(err => {
        dispatch(getInstructorFailed(err));
        reject(err);
    });
});

// POST: '/instructors'
export const createInstructor = (instructorName, researchInterests) => dispatch => new Promise((resolve, reject) => {
    dispatch(postInstructorRequest());

    let body = {
        instructorName: instructorName,
        researchInterests: researchInterests,
        crossDomain: true
    }

    axios.post(
        config.API_URL + '/instructors', 
        body
    ).then(res => {
        dispatch(postInstructorSuccess(res));
        resolve(res);
    }).catch(err => {
        dispatch(postInstructorFailed(err));
        reject(err);
    });
});

// PUT: '/instructors/:instructorId'
export const updateInstructor = (instructorId, instructorName, researchInterests) => dispatch => new Promise((resolve, reject) => {
    dispatch(putInstructorRequest());
    
    let body = {
        instructorName: instructorName,
        researchInterests: researchInterests,
        crossDomain: true
    }

    axios.put(
        config.API_URL + '/instructors/' + instructorId,
        body
    ).then(res => {
        dispatch(putInstructorSuccess(res));
        resolve(res);
    }).catch(err => {
        dispatch(putInstructorFailed(err));
        reject(err);
    });
});

// DELETE: '/courses/:courseNo/:courseName'
export const deleteInstructor = (instructorId, instructorName, researchInterests) => dispatch => new Promise((resolve, reject) => {
    dispatch(deleteInstructorRequest());

    let body = {
        crossDomain: true
    }

    axios.delete(
        config.API_URL + '/instructors/' + instructorId, 
        body
    ).then(res => {
        dispatch(deleteInstructorSuccess(res));
        resolve(res);
    }).catch(err => {
        dispatch(deleteInstructorFailed(err));
        reject(err);
    });
});