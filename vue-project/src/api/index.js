import axios from 'axios';

const API_URL = '';

const handleError = error => {
	console.log(error);
};

const request = (pathTo, method = 'GET', body = {}, query = undefined) => {
	const token = window.localStorage.getItem('token');
	return axios({
		method: method,
		url: `${API_URL}${pathTo}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: body,
		params: query,
	})
		.then(response => response.data.data)
		.catch(error => handleError(error));
};

export default request;
