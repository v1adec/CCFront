import request from './index';

const getGoals = () => {
	return request('/api/goals', 'GET');
};

const addGoal = (money, dateStart, dateFinish) => {
	return request('/api/goals', 'POST', { money, dateStart, dateFinish });
};

const deleteGoal = () => {
	return request('/api/goals', 'DELETE', {});
};

export default {
	getGoals,
	addGoal,
	deleteGoal,
};
