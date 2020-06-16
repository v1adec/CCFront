import request from './index';

const getTransactions = (id, fromDate, type, toDate = undefined) => {
	return request('/api/transactions', 'GET', {}, toDate, {
		id,
		fromDate,
		type,
	});
};

const addTransaction = ({
	money,
	date,
	type,
	description,
	itemId,
	workType,
	currencyId,
}) => {
	return request('/api/transactions', 'POST', {
		money,
		date,
		type,
		description,
		itemId,
		workType,
		currencyId,
	});
};

const deleteTransaction = id => {
	return request('/api/transactions', 'DELETE', {}, {}, { id });
};

export default {
	getTransactions,
	addTransaction,
	deleteTransaction,
};
