const BASE_URL = 'http://127.0.0.1:5000/'

// GET '/entries'
export const getEntries = async() => {
	try {
		let body = {
			crossDomain: true
		};

		const response = await.get(BASE_URL + '/entries', body);
		return response;
	} catch(err) {
		console.log(err);
	}
}