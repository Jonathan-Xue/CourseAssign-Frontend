const prod = {
	API_URL: 'https://cs411-project-273718.uc.r.appspot.com/',
};

const dev = {
	API_URL: 'http://127.0.0.1:5000/',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;