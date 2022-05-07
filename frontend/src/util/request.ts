import axios from './axios';

//

const GET = (url: string) => {
	// if (localStorageToJson())
	axios.defaults.headers.common['Authorization'] =
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMkBpbWFpbC5jb20iLCJpYXQiOjE2NTE4NzU3NzJ9.vLJL9Ss6Tduia-1BtJYCp1D3BZMJYwRRmoMg1rs8gko';

	return axios.get(url).catch((error) => {
		if (error.response) {
			return error.response.data;
		} else if (error.request) {
			console.log(`Error from Request ${error.request}`);
		} else {
			console.log(`General Error ${error.message}`);
		}
	});
};

const POST = (url: string, params = {}) => {
	// axios.defaults.headers.common['auth-token'] = localStorageToJson().token;
	return axios.post(url, params).catch((error) => {
		if (error.response) {
			return error.response.data;
		} else if (error.request) {
			console.log(`Error from Request ${error.request}`);
		} else {
			console.log(`General Error ${error.message}`);
		}
	});
};

export { GET, POST };
