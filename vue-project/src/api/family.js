import request from './index'

const getFamily = () => {
	return request('/api/family', 'GET')
}
