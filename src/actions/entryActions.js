import { BASE_URL, GET_ENTRY_REQUEST, GET_ENTRY_SUCCESS, GET_ENTRY_FAILED, POST_ENTRY_REQUEST, POST_ENTRY_SUCCESS, POST_ENTRY_FAILED, DELETE_ENTRY_REQUEST, DELETE_ENTRY_SUCCESS, DELETE_ENTRY_FAILED } from '../constants/actionTypes';
import axios from 'axios';

// Actions
const getEntryRequest = () => {
    return {
        type: ENTRY_REQUEST,
    }
}

const getEntrySuccess = (res) => {
    return {
        type: GET_ENTRY_SUCCESS,
        payload: res,
    }
}

const getEntryFailed = (err) => {
    return {
        type: GET_ENTRY_FAILED,
        payload: err,
    }
}

const postEntryRequest = () => {
    return {
        type: POST_ENTRY_REQUEST,
    }
}

const postEntrySuccess = (res) => {
    return {
        type: POST_ENTRY_SUCCESS,
        payload: res,
    }
}

const postEntryFailed = (err) => {
    return {
        type: POST_ENTRY_FAILED,
        payload: err,
    }
}

const deleteEntryRequest = () => {
    return {
        type: DELETE_ENTRY_REQUEST,
    }
}

const deleteEntrySuccess = (res) => {
    return {
        type: DELETE_ENTRY_SUCCESS,
        payload: res,
    }
}

const deleteEntryFailed = (err) => {
    return {
        type: DELETE_ENTRY_FAILED,
        payload: err,
    }
}

// Thunk
// GET: '/courses'
export const getEntries = () => dispatch => {
	dispatch(getEntryRequest());

	let body = { 
		crossDomain: true 
	};

	axios.get(
		BASE_URL + '/entries', 
		body
	).then(res => {
		dispatch(getEntrySuccess(res));
	}).catch(err => {
		dispatch(getEntryError(err));
	});
};

// POST: '/entries'
export const createEntry = (courseNo, courseName, year, term, primaryInstructor, aPlus, a, aMinus, bPlus, b, bMinus, cPlus, c, cMinus, dPlus, d, dMinus, f) => dispatch => {
	dispatch(postEntryRequest());

	let body = {
		courseNo: courseNo,
		courseName: courseName,
		year: year,
		term: term,
		primaryInstructor: primaryInstructor,
		aPlus: aPlus,
		a: a,
		aMinus: aMinus,
		bPlus: bPlus,
		b: b,
		bMinus: bMinus,
		cPlus: cPlus,
		c: c,
		cMinus: cMinus,
		dPlus: dPlus,
		d: d,
		dMinus: dMinus,
		f: f,
		crossDomain: true
	};

	axios.post(
		BASE_URL + '/entries', 
		body
	).then(res => {
		dispatch(postEntrySuccess(res));
	}).catch(err => {
		dispatch(postEntryFailed(res));
	});
}

// DELETE: '/entries/:courseNo/:courseName/:year/:term/:primaryInstructor'
export const deleteEntry = ( courseNo, courseName, year, term, primaryInstructor) => dispatch => {
	dispatch(deleteEntryRequest());
	
	let body = {
		crossDomain: true
	};

	axios.delete(
		BASE_URL + '/entries/' + courseNo + '/' + courseName + '/' + year + '/' + term + '/' + primaryInstructor, 
		body
	).then(res => {
		dispatch(deleteEntrySuccess(res));
	}).catch(err => {
		dispatch(deleteEntryFailed(res));
	})
}