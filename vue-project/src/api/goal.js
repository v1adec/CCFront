import request from './index';

const getGoals = () => {
	return request('/api/goals', 'GET');
};

const addGoal = ({ money, dateStart, dateFinish }) => {
	return request('/api/goals', 'POST', { money, dateStart, dateFinish });
};

const deleteGoal = id => {
	return request('/api/goals', 'DELETE', {}, {}, { id });
};

export default {
	getGoals,
	addGoal,
	deleteGoal,
};
