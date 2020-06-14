import request from './index'

const getGoals = () => {
	return request('/api/goals', 'GET')
}
