import request from './index';

const getItems = () => {
	return request('/api/items', 'GET');
};

const addItem = name => {
	return request('/api/items', 'POST', { name });
};

const deleteItem = () => {
	return request('/api/items', 'DELETE', {});
};

const editItem = () => {
	return request('/api/items', 'PUT', { name });
};

export default {
	deleteItem,
	getItems,
	editItem,
	addItem,
};
