import request from './index';

const getCurrencies = () => {
	return request('/api/currencies', 'GET');
};

export default {
	getCurrencies,
};
