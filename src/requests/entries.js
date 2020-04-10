import axios from 'axios';

// BASE URL
const BASE_URL = 'http://127.0.0.1:5000/';

// GET '/entries'
export const getEntries = async() => {
	try {
		let body = {
			crossDomain: true
		};

		const response = await axios.get(BASE_URL + '/entries', body);
		return response;
	} catch(err) {
		console.log(err);
	}
}


// POST: '/entries'
export const createEntry = async(
	courseNo,
	courseName,
	year,
	term,
	primaryInstructor,
	aPlus,
	a,
	aMinus,
	bPlus,
	b,
	bMinus,
	cPlus,
	c,
	cMinus,
	dPlus,
	d,
	dMinus,
	f
) => {
	try {
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
		}

		const response = await axios.post(
			BASE_URL + '/entries', 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}

// PUT: '/entries/:courseNo/:courseName/:year/:term/:primaryInstructor'
export const updateEntry = async(
	courseNo,
	courseName,
	year,
	term,
	primaryInstructor,
	aPlus,
	a,
	aMinus,
	bPlus,
	b,
	bMinus,
	cPlus,
	c,
	cMinus,
	dPlus,
	d,
	dMinus,
	f
) => {
	try {
		let body = {
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
		}

		const response = await axios.put(
			BASE_URL + '/entries/' + courseNo + '/' + courseName + '/' + year + '/' + term + '/' + primaryInstructor, 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}

// DELETE: '/entries/:courseNo/:courseName/:year/:term/:primaryInstructor'
export const deleteEntry = async(
	courseNo,
	courseName,
	year,
	term,
	primaryInstructor
) => {
	try {
		let body = {
			crossDomain: true
		}

		const response = await axios.delete(
			BASE_URL + '/entries/' + courseNo + '/' + courseName + '/' + year + '/' + term + '/' + primaryInstructor, 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}