import request from './index'

const getTransactions = () => {
	return request('/api/transactions', 'GET')
}
