import { set } from '../utils';
import goalsClient from '@/api/goal';

const getDefaultState = () => {
	return {
		goals: [],
	};
};

const state = getDefaultState();

const mutations = {
	setGoals: set('goals'),
	resetState(state) {
		Object.assign(state, getDefaultState());
	},
};

const getters = {};

const actions = {
	async fetchGoals({ commit }) {
		const { list } = await goalsClient.getGoals();
		commit('setGoals', list);
	},
	async addGoal({ dispatch }, payload) {
		await goalsClient.addGoal(payload);
		dispatch('fetchGoals');
	},
	async deleteGoal({ dispatch }, payload) {
		await goalsClient.deleteGoal(payload);
		dispatch('fetchGoals');
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
};
