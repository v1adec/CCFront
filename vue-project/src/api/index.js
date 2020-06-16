import axios from 'axios';
import { cleanEmpty } from '@/utils';
import router from '@/router';

const API_URL = '';

const handleError = error => {
	console.log(error);
};

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response.status === 401) {
			router.push('/auth');
		} else {
			return Promise.reject(error);
		}
	}
);

const request = (
	pathTo,
	method = 'GET',
	body = {},
	query = undefined,
	headers = undefined
) => {
	const token = window.localStorage.getItem('token');
	const headersClean = cleanEmpty(headers);
	return axios({
		method: method,
		url: `${API_URL}${pathTo}`,
		headers: {
			Authorization: `Bearer ${token}`,
			...headersClean,
		},
		data: body,
		params: query,
	})
		.then(response => response.data.data)
		.catch(error => handleError(error));
};

export default request;
