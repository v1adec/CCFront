import request from './index';

const getAccount = () => {
	return request('/api/accounts', 'GET');
};
const loginUser = (username, password) => {
	return request('/api/accounts/login', 'POST', { username, password });
};
const addUser = () => {
	return request('/api/accounts/registration', 'POST');
};

export default {
	getAccount,
	loginUser,
	addUser,
};
