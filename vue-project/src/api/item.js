import request from './index'

const getItems = () => {
	return request('/api/items', 'GET')
}
