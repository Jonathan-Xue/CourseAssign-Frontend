const BASE_URL = 'http://127.0.0.1:5000/'

// GET: '/courses'
export const getCourses = async() => {
	try {
		let body = {
			crossDomain: true
		};

		const response = await.get(
			BASE_URL + '/courses', 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}

// POST: '/courses'
export const createCourse = async(
	courseNo,
	courseName,
	courseDesc
) => {
	try {
		let body = {
			courseNo: courseNo,
			courseName: courseName,
			courseDesc: courseDesc,
			crossDomain: true
		}

		const response = await axios.post(
			BASE_URL + '/courses', 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}

// PUT: '/courses/:courseNo/:courseName'
export const updateCourse = async(
	courseNo,
	courseName,
	courseDesc
) => {
	try {
		let body = {
			courseDesc: courseDesc,
			crossDomain: true
		}

		const response = await axios.put(
			BASE_URL + '/courses/' + courseNo + '/' + courseName, 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}

// DELETE: '/courses/:courseNo/:courseName'
export const deleteCourse = async(
	courseNo,
	courseName
) => {
	try {
		let body = {
			crossDomain: true
		}

		const response = await axios.delete(
			BASE_URL + '/courses/' + courseNo + '/' + courseName, 
			body
		);
		return response;
	} catch(err) {
		console.log(err);
	}
}