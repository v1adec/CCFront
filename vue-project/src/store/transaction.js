import { set } from '../utils';
import transactionClient from '@/api/transaction';

const getDefaultState = () => {
	return {
		transactions: [],
	};
};

const state = getDefaultState();

const mutations = {
	setTransactions: set('transactions'),
	resetState(state) {
		Object.assign(state, getDefaultState());
	},
};

const getters = {};

const actions = {
	async fetchTransactions({ commit }) {
		const { list } = await transactionClient.getTransactions();
		commit('setTransactions', list);
	},
	async addTransaction({ dispatch }, payload) {
		await transactionClient.addTransaction(payload);
		dispatch('fetchTransactions');
	},
	async deleteTransaction({ dispatch }, payload) {
		await transactionClient.deleteTransaction(payload);
		dispatch('fetchTransactions');
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
};
