import request from './index';

const getAccount = () => {
	return request('/api/accounts', 'GET');
};
const loginUser = (username, password) => {
	return request('/api/accounts/login', 'POST', { username, password });
};
const addUser = (userName, email, password) => {
	return request('/api/accounts/registration', 'POST', {
		userName,
		email,
		password,
	});
};

export default {
	getAccount,
	loginUser,
	addUser,
};
